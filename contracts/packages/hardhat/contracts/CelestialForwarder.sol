//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/Address.sol";

abstract contract Nonces {
    /**
     * @dev The nonce used for an `account` is not the expected current nonce.
     */
    error InvalidAccountNonce(address account, uint256 currentNonce);

    mapping(address => uint256) private _nonces;

    /**
     * @dev Returns the next unused nonce for an address.
     */
    function nonces(address owner) public view virtual returns (uint256) {
        return _nonces[owner];
    }

    /**
     * @dev Consumes a nonce.
     *
     * Returns the current value and increments nonce.
     */
    function _useNonce(address owner) internal virtual returns (uint256) {
        // For each account, the nonce has an initial value of 0, can only be incremented by one, and cannot be
        // decremented or reset. This guarantees that the nonce never overflows.
        unchecked {
            // It is important to do x++ and not ++x here.
            return _nonces[owner]++;
        }
    }

    /**
     * @dev Same as {_useNonce} but checking that `nonce` is the next valid for `owner`.
     */
    function _useCheckedNonce(address owner, uint256 nonce) internal virtual {
        uint256 current = _useNonce(owner);
        if (nonce != current) {
            revert InvalidAccountNonce(owner, current);
        }
    }
}

contract CelestialForwarder is EIP712, Nonces {
    using ECDSA for bytes32;

    struct ForwardRequestData {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint48 deadline;
        bytes data;
        bytes signature;
    }

    bytes32 internal constant _FORWARD_REQUEST_TYPEHASH =
        keccak256(
            "ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,uint48 deadline,bytes data)"
        );

    /**
     * @dev Emitted when a `ForwardRequest` is executed.
     *
     * NOTE: An unsuccessful forward request could be due to an invalid signature, an expired deadline,
     * or simply a revert in the requested call. The contract guarantees that the relayer is not able to force
     * the requested call to run out of gas.
     */
    event ExecutedForwardRequest(address indexed signer, uint256 nonce, bool success);

    /**
     * @dev The request `from` doesn't match with the recovered `signer`.
     */
    error ERC2771ForwarderInvalidSigner(address signer, address from);

    /** 
     * @dev The `requestedValue` doesn't match with the available `msgValue`.
     */
    error ERC2771ForwarderMismatchedValue(uint256 requestedValue, uint256 msgValue);

    /**
     * @dev The request `deadline` has expired.
     */
    error ERC2771ForwarderExpiredRequest(uint48 deadline);

    /**
     * @dev The request target doesn't trust the `forwarder`.
     */
    error ERC2771UntrustfulTarget(address target, address forwarder);

    /**
     * @dev See {EIP712-constructor}.
     */
    constructor(string memory name) EIP712(name, "1") {}

    /**
     * @dev Returns `true` if a request is valid for a provided `signature` at the current block timestamp.
     *
     * A transaction is considered valid when the target trusts this forwarder, the request hasn't expired
     * (deadline is not met), and the signer matches the `from` parameter of the signed request.
     *
     * NOTE: A request may return false here but it won't cause {executeBatch} to revert if a refund
     * receiver is provided.
     */
    function verify(ForwardRequestData calldata request) public view virtual returns (bool) {
        (bool isTrustedForwarder, bool active, bool signerMatch, ) = _validate(request);
        return isTrustedForwarder && active && signerMatch;
    }

    /**
     * @dev Executes a `request` on behalf of `signature`'s signer using the ERC-2771 protocol. The gas
     * provided to the requested call may not be exactly the amount requested, but the call will not run
     * out of gas. Will revert if the request is invalid or the call reverts, in this case the nonce is not consumed.
     *
     * Requirements:
     *
     * - The request value should be equal to the provided `msg.value`.
     * - The request should be valid according to {verify}.
     */
    function execute(ForwardRequestData calldata request) public payable virtual {
        // We make sure that msg.value and request.value match exactly.
        // If the request is invalid or the call reverts, this whole function
        // will revert, ensuring value isn't stuck.
        if (msg.value != request.value) {
            revert ERC2771ForwarderMismatchedValue(request.value, msg.value);
        }

        if (!_execute(request, true)) {
            revert ERC2771ForwarderInvalidSigner(request.from, msg.sender);
        }
    }

    /**
     * @dev Batch version of {execute} with optional refunding and atomic execution.
     *
     * In case a batch contains at least one invalid request (see {verify}), the
     * request will be skipped and the `refundReceiver` parameter will receive back the
     * unused requested value at the end of the execution. This is done to prevent reverting
     * the entire batch when a request is invalid or has already been submitted.
     *
     * If the `refundReceiver` is the `address(0)`, this function will revert when at least
     * one of the requests was not valid instead of skipping it. This could be useful if
     * a batch is required to get executed atomically (at least at the top-level). For example,
     * refunding (and thus atomicity) can be opt-out if the relayer is using a service that avoids
     * including reverted transactions.
     *
     * Requirements:
     *
     * - The sum of the requests' values should be equal to the provided `msg.value`.
     * - All of the requests should be valid (see {verify}) when `refundReceiver` is the zero address.
     *
     * NOTE: Setting a zero `refundReceiver` guarantees an all-or-nothing requests execution only for
     * the first-level forwarded calls. In case a forwarded request calls to a contract with another
     * subcall, the second-level call may revert without the top-level call reverting.
     */
    function executeBatch(
        ForwardRequestData[] calldata requests,
        address payable refundReceiver
    ) public payable virtual {
        bool atomic = refundReceiver == address(0);

        uint256 requestsValue;
        uint256 refundValue;

        for (uint256 i; i < requests.length; ++i) {
            requestsValue += requests[i].value;
            bool success = _execute(requests[i], atomic);
            if (!success) {
                refundValue += requests[i].value;
            }
        }

        // The batch should revert if there's a mismatched msg.value provided
        // to avoid request value tampering
        if (requestsValue != msg.value) {
            revert ERC2771ForwarderMismatchedValue(requestsValue, msg.value);
        }

        // Some requests with value were invalid (possibly due to frontrunning).
        // To avoid leaving ETH in the contract this value is refunded.
        if (refundValue != 0) {
            // We know refundReceiver != address(0) && requestsValue == msg.value
            // meaning we can ensure refundValue is not taken from the original contract's balance
            // and refundReceiver is a known account.
            Address.sendValue(refundReceiver, refundValue);
        }
    }

    /**
     * @dev Validates if the provided request can be executed at current block timestamp with
     * the given `request.signature` on behalf of `request.signer`.
     */
    function _validate(
        ForwardRequestData calldata request
    ) internal view virtual returns (bool isTrustedForwarder, bool active, bool signerMatch, address signer) {
        (bool isValid, address recovered) = _recoverForwardRequestSigner(request);

        return (
            _isTrustedByTarget(request.to),
            request.deadline >= block.timestamp,
            isValid && recovered == request.from,
            recovered
        );
    }

    /**
     * @dev Returns a tuple with the recovered the signer of an EIP712 forward request message hash
     * and a boolean indicating if the signature is valid.
     *
     * NOTE: The signature is considered valid if {ECDSA-tryRecover} indicates no recover error for it.
     */
    function _recoverForwardRequestSigner(
        ForwardRequestData calldata request
    ) internal view virtual returns (bool, address) {
        (address recovered, ECDSA.RecoverError err ) = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    _FORWARD_REQUEST_TYPEHASH,
                    request.from,
                    request.to,
                    request.value,
                    request.gas,
                    nonces(request.from),
                    request.deadline,
                    keccak256(request.data)
                )
            )
        ).tryRecover(request.signature);

        return (err == ECDSA.RecoverError.NoError, recovered);
    }

    /**
     * @dev Validates and executes a signed request returning the request call `success` value.
     *
     * Internal function without msg.value validation.
     *
     * Requirements:
     *
     * - The caller must have provided enough gas to forward with the call.
     * - The request must be valid (see {verify}) if the `requireValidRequest` is true.
     *
     * Emits an {ExecutedForwardRequest} event.
     *
     * IMPORTANT: Using this function doesn't check that all the `msg.value` was sent, potentially
     * leaving value stuck in the contract.
     */
    function _execute(
        ForwardRequestData calldata request,
        bool requireValidRequest
    ) internal virtual returns (bool success) {
        (bool isTrustedForwarder, bool active, bool signerMatch, address signer) = _validate(request);

        // Need to explicitly specify if a revert is required since non-reverting is default for
        // batches and reversion is opt-in since it could be useful in some scenarios
        if (requireValidRequest) {
            if (!isTrustedForwarder) {
                revert ERC2771UntrustfulTarget(request.to, address(this));
            }

            if (!active) {
                revert ERC2771ForwarderExpiredRequest(request.deadline);
            }

            if (!signerMatch) {
                revert ERC2771ForwarderInvalidSigner(signer, request.from);
            }
        }

        // Ignore an invalid request because requireValidRequest = false
        if (isTrustedForwarder && signerMatch && active) {
            // Nonce should be used before the call to prevent reusing by reentrancy
            uint256 currentNonce = _useNonce(signer);

            uint256 reqGas = request.gas;
            address to = request.to;
            uint256 value = request.value;
            bytes memory data = abi.encodePacked(request.data, request.from);

            uint256 gasLeft;

            assembly {
                success := call(reqGas, to, value, add(data, 0x20), mload(data), 0, 0)
                gasLeft := gas()
            }

            _checkForwardedGas(gasLeft, request);

            emit ExecutedForwardRequest(signer, currentNonce, success);
        }
    }

    /**
     * @dev Returns whether the target trusts this forwarder.
     *
     * This function performs a static call to the target contract calling the
     * {ERC2771Context-isTrustedForwarder} function.
     */
    function _isTrustedByTarget(address target) private view returns (bool) {
        bytes memory encodedParams = abi.encodeCall(ERC2771Context.isTrustedForwarder, (address(this)));

        bool success;
        uint256 returnSize;
        uint256 returnValue;
        /// @solidity memory-safe-assembly
        assembly {
            // Perform the staticcal and save the result in the scratch space.
            // | Location  | Content  | Content (Hex)                                                      |
            // |-----------|----------|--------------------------------------------------------------------|
            // |           |          |                                                           result ↓ |
            // | 0x00:0x1F | selector | 0x0000000000000000000000000000000000000000000000000000000000000001 |
            success := staticcall(gas(), target, add(encodedParams, 0x20), mload(encodedParams), 0, 0x20)
            returnSize := returndatasize()
            returnValue := mload(0)
        }

        return success && returnSize >= 0x20 && returnValue > 0;
    }

    /**
     * @dev Checks if the requested gas was correctly forwarded to the callee.
     *
     * As a consequence of https://eips.ethereum.org/EIPS/eip-150[EIP-150]:
     * - At most `gasleft() - floor(gasleft() / 64)` is forwarded to the callee.
     * - At least `floor(gasleft() / 64)` is kept in the caller.
     *
     * It reverts consuming all the available gas if the forwarded gas is not the requested gas.
     *
     * IMPORTANT: The `gasLeft` parameter should be measured exactly at the end of the forwarded call.
     * Any gas consumed in between will make room for bypassing this check.
     */
    function _checkForwardedGas(uint256 gasLeft, ForwardRequestData calldata request) private pure {
        // To avoid insufficient gas griefing attacks, as referenced in https://ronan.eth.limo/blog/ethereum-gas-dangers/
        //
        // A malicious relayer can attempt to shrink the gas forwarded so that the underlying call reverts out-of-gas
        // but the forwarding itself still succeeds. In order to make sure that the subcall received sufficient gas,
        // we will inspect gasleft() after the forwarding.
        //
        // Let X be the gas available before the subcall, such that the subcall gets at most X * 63 / 64.
        // We can't know X after CALL dynamic costs, but we want it to be such that X * 63 / 64 >= req.gas.
        // Let Y be the gas used in the subcall. gasleft() measured immediately after the subcall will be gasleft() = X - Y.
        // If the subcall ran out of gas, then Y = X * 63 / 64 and gasleft() = X - Y = X / 64.
        // Under this assumption req.gas / 63 > gasleft() is true is true if and only if
        // req.gas / 63 > X / 64, or equivalently req.gas > X * 63 / 64.
        // This means that if the subcall runs out of gas we are able to detect that insufficient gas was passed.
        //
        // We will now also see that req.gas / 63 > gasleft() implies that req.gas >= X * 63 / 64.
        // The contract guarantees Y <= req.gas, thus gasleft() = X - Y >= X - req.gas.
        // -    req.gas / 63 > gasleft()
        // -    req.gas / 63 >= X - req.gas
        // -    req.gas >= X * 63 / 64
        // In other words if req.gas < X * 63 / 64 then req.gas / 63 <= gasleft(), thus if the relayer behaves honestly
        // the forwarding does not revert.
        if (gasLeft < request.gas / 63) {
            // We explicitly trigger invalid opcode to consume all gas and bubble-up the effects, since
            // neither revert or assert consume all gas since Solidity 0.8.20
            // https://docs.soliditylang.org/en/v0.8.20/control-structures.html#panic-via-assert-and-error-via-require
            /// @solidity memory-safe-assembly
            assembly {
                invalid()
            }
        }
    }
}