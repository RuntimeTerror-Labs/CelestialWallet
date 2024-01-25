//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Celestial.sol";
import "./CelestialStorage.sol";

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract CelestialFactory is CelestialStorage, ERC2771Context {
    Celestial public immutable CELESTIAL_IMPLEMENTATION;

    constructor(address _trustedForwarder, address _passkeyVerifier, address _recoveryVerifier) ERC2771Context(_trustedForwarder) {
        CELESTIAL_IMPLEMENTATION = new Celestial(address(this), _passkeyVerifier, _recoveryVerifier);
    }

    modifier onlyTrustedForwarder() {
        require(isTrustedForwarder(msg.sender), "VUZI: caller is not the trusted forwarder");
        _;
    }

    function createAccount(string memory name, bytes32 passwordHash, bytes32 recoveryHash, uint256 salt) external returns (Celestial ret) {
        require(CelestialNameToDetails[name].isUsed == false, "Celestial: Celestial already exists");

        address addr = getAddress(passwordHash, recoveryHash , salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return Celestial(payable(addr));
        }
        ret = Celestial(payable(new ERC1967Proxy{salt : bytes32(salt)}(
                address(CELESTIAL_IMPLEMENTATION),
                abi.encodeCall(Celestial.initialize, (passwordHash, recoveryHash))
            )));
        addCelestial(name, address(ret));
    }

    function getAddress(bytes32 passwordHash, bytes32 recoveryHash, uint256 salt) public view returns (address) {
        return Create2.computeAddress(bytes32(salt), keccak256(abi.encodePacked(
            type(ERC1967Proxy).creationCode,
            abi.encode(
                address(CELESTIAL_IMPLEMENTATION),
                abi.encodeCall(Celestial.initialize, (passwordHash, recoveryHash))
            )
        )));
    }

    function executeCelestialTx(string memory name, bytes calldata proof, address dest, uint256 value, bytes calldata func) onlyTrustedForwarder isValidCelestial(name) external returns (bool) {
        Celestial celestial = Celestial(payable(address(CelestialNameToDetails[name].walletAddress)));

        return celestial.execute(proof, dest, value, func);
    }

    function executeCelestialBatchTx(string memory name, bytes calldata proof, address[] calldata dests, uint256[] calldata values, bytes[] calldata funcs) onlyTrustedForwarder isValidCelestial(name) external returns (bool) {
        Celestial celestial = Celestial(payable(address(CelestialNameToDetails[name].walletAddress)));

        return celestial.executeBatch(proof, dests, values, funcs);
    }

    function executeCelestialPasskeyRecovery(string memory name, bytes calldata proof, bytes32 _passwordHash) onlyTrustedForwarder isValidCelestial(name) external returns (bool) {
        Celestial celestial = Celestial(payable(address(CelestialNameToDetails[name].walletAddress)));

        return celestial.executePasskeyRecovery(proof, _passwordHash);
    }

    function executeCelestialChangeRecovery(string memory name, bytes calldata proof, bytes32 _recoveryHash) onlyTrustedForwarder isValidCelestial(name) external returns (bool) {
        Celestial celestial = Celestial(payable(address(CelestialNameToDetails[name].walletAddress)));

        return celestial.executeChangeRecovery(proof, _recoveryHash);
    }
}