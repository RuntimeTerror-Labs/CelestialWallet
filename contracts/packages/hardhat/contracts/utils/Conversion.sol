//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

library Conversion {
    function convertInputs(bytes32 message, bytes32 pubkeyHash) internal pure returns (bytes32 [] memory){
        bytes32[] memory byte32Inputs = new bytes32[](64);

        for (uint256 i = 0; i < 32; i++) {
            byte32Inputs[i] = convertToPaddedByte32(message[i]);
        }

        for (uint256 i = 0; i < 32; i++) {
            byte32Inputs[i + 32] = convertToPaddedByte32(pubkeyHash[i]);
        }

        return byte32Inputs;
    }

    function convertToPaddedByte32(bytes32 value) internal pure returns (bytes32) {
        bytes32 paddedValue;
        paddedValue = bytes32(uint256(value) >> (31 * 8));
        return paddedValue;
    } 

    function hashMessage(string memory message) internal pure returns (bytes32) {
        string memory messagePrefix = "\x19Ethereum Signed Message:\n";

        string memory lengthString = Strings.toString(bytes(message).length);

        string memory concatenatedMessage = string(abi.encodePacked(messagePrefix, lengthString, message));

        return keccak256(bytes(concatenatedMessage));
    }

    function encodeDetails(address account, uint256 balance) internal pure returns (string memory) {
        bytes memory json = abi.encodePacked('{"address":"', toString(account), '","balance":', Strings.toString(balance), '}');
        return base64Encode(json);
    }

    function toString(address account) internal pure returns (string memory) {
        return Strings.toString(uint160(account));
    }

    function encode(uint256 number) internal pure returns (uint256 result) {
        for (uint256 i = 0; i < 4; i++) {
            result |= (number & 0xFF) << (i * 8);
            number >>= 6;
        }
    }

    function base64Encode(bytes memory data) internal pure returns (string memory) {
        string memory base64abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        uint256 length = data.length;
        if (length == 0) return "";
        uint256 encodedLength = 4 * ((length + 2) / 3);
        string memory result = new string(encodedLength + encodedLength / 76);
        bytes memory resultBytes = bytes(result);

        uint256 index = 0;
        uint256 counter = 0;
        for (uint256 i = 0; i < length; i += 3) {
            uint256 number = uint256(uint8(data[i])) << 16;
            if (i + 1 < length) number |= uint256(uint8(data[i + 1])) << 8;
            if (i + 2 < length) number |= uint256(uint8(data[i + 2]));

            uint256 encoded = encode(number);
            for (uint256 j = 0; j < 4; j++) {
                if (i + j < length) {
                    resultBytes[index++] = bytes(base64abc)[encoded & 0xFF];
                } else {
                    resultBytes[index++] = "=";
                }
                encoded >>= 8;
            }

            if (++counter == 19 && index < encodedLength) {
                resultBytes[index++] = "\n";
                counter = 0;
            }
        }

        return string(resultBytes);
    }
}