//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract CelestialStorage {
    
    struct CelestialDetails {
        address walletAddress;
        bool isUsed;
    }

    mapping(string => CelestialDetails) public CelestialNameToDetails;

    function addCelestial(string memory name, address walletAddress) internal {
        CelestialNameToDetails[name] = CelestialDetails(walletAddress, true);
    }

    function _checkCelestial(string memory name) internal view {
        require(CelestialNameToDetails[name].isUsed, "Celestial: Invalid Celestial");
    }
    
    function getCelestial(string memory name) external view returns (CelestialDetails memory) {
        CelestialDetails memory details = CelestialNameToDetails[name];
        return details;
    }

    modifier isValidCelestial(string memory name) {
        _checkCelestial(name);
        _;
    }

}