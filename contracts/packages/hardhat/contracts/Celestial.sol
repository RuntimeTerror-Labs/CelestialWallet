//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./callback/TokenCallbackHandler.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./verifier/PasskeyVerifier.sol";
import "./verifier/RecoveryVerifier.sol";

import "./utils/Conversion.sol";

contract Celestial is TokenCallbackHandler, Initializable{
    address public immutable CELESTIAL_FACTORY;
    PasskeyUltraVerifier public immutable PASSKEY_VERIFIER;
    RecoveryUltraVerifier public immutable RECOVERY_VERIFIER;

    bytes32 public passwordHash;

    bytes32 public recoveryHash;

    uint256 private nonce;

    constructor(
        address _celestialFactory,
        address _passkeyVerifier,
        address _recoveryVerifier
    ) {
        CELESTIAL_FACTORY = _celestialFactory;
        PASSKEY_VERIFIER = PasskeyUltraVerifier(_passkeyVerifier);
        RECOVERY_VERIFIER = RecoveryUltraVerifier(_recoveryVerifier);
    }

    modifier onlyCelestialFactory() {
        require(msg.sender == CELESTIAL_FACTORY, "Celestial: Only Celestial Factory");
        _;
    }

    function getNonce() public view returns (uint256) {
        return nonce;
    }

    function _useNonce() internal returns (uint256) {
        unchecked {
            return nonce++;
        }
    }

    function initialize(bytes32 _passwordHash, bytes32 _recoveryHash) external initializer {
        _initialize(_passwordHash, _recoveryHash);
    }

    function _initialize(bytes32 _passwordHash, bytes32 _recoveryHash) internal virtual {
        passwordHash = _passwordHash;
        recoveryHash = _recoveryHash;
    }

    function verifyPasskey(bytes calldata proof) public view returns (bool) {
        bytes32[] memory byte32Inputs = new bytes32[](2);

        byte32Inputs[0] = passwordHash;
        byte32Inputs[1] = bytes32(getNonce());

        return PASSKEY_VERIFIER.verify(proof, byte32Inputs);
    }

    function verifyRecovery(bytes calldata proof) public view returns (bool) {
        bytes32 message = Conversion.hashMessage(Strings.toString(getNonce()));

        bytes32[] memory _inputs = Conversion.convertInputs(message, recoveryHash);

        return RECOVERY_VERIFIER.verify(proof, _inputs);
    }

    function usePasskey(bytes calldata proof) internal returns (bool) {
        bytes32[] memory byte32Inputs = new bytes32[](2);

        byte32Inputs[0] = passwordHash;
        byte32Inputs[1] = bytes32(_useNonce());

        return PASSKEY_VERIFIER.verify(proof, byte32Inputs);
    }

    function useRecovery(bytes calldata proof) internal returns (bool) {
        bytes32 message = Conversion.hashMessage(Strings.toString(_useNonce()));

        bytes32[] memory _inputs = Conversion.convertInputs(message, recoveryHash);

        return RECOVERY_VERIFIER.verify(proof, _inputs);
    }

    function execute(bytes calldata proof, address dest, uint256 value, bytes calldata func) external payable returns (bool) {
        require(usePasskey(proof), "Invalid passkey");
        _execute(dest, value, func);
        return true;
    }

    function executeBatch(bytes calldata proof, address[] calldata dest, uint256[] calldata value, bytes[] calldata func) external payable returns (bool) {
        require(usePasskey(proof), "Invalid passkey");
        _executeBatch(dest, value, func);
        return true;
    }

    function executePasskeyRecovery(bytes calldata proof, bytes32 _passwordHash) external payable returns (bool) {
        require(useRecovery(proof), "Invalid recovery");
        _changePassword(_passwordHash);
        return true;
    }

    function executeChangeRecovery(bytes calldata proof, bytes32 _recoveryHash) external payable returns (bool) {
        require(useRecovery(proof), "Invalid recovery");
        _changeRecovery(_recoveryHash);
        return true;
    }

    function _changePassword(bytes32 _passwordHash) internal  {
		passwordHash = _passwordHash;
	}

    function _changeRecovery(bytes32 _recoveryHash) internal  {
        recoveryHash = _recoveryHash;
    }

    function _execute(address dest, uint256 value, bytes calldata func) internal {
        _call(dest, value, func);
    }

    function _executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func) internal {
        require(dest.length == func.length && (value.length == 0 || value.length == func.length), "wrong array lengths");
        if (value.length == 0) {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], 0, func[i]);
            }
        } else {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], value[i], func[i]);
            }
        }
    }

	function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value : value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    receive() external payable {}

    fallback() external payable {}
}