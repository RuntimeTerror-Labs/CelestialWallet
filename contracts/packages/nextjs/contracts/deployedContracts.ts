/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  1891: {
    CelestialFactory: {
      address: "0x0562eefAD05870Dd74dEE7d08a338182eB86De25",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_trustedForwarder",
              type: "address",
            },
            {
              internalType: "address",
              name: "_passkeyVerifier",
              type: "address",
            },
            {
              internalType: "address",
              name: "_recoveryVerifier",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "CELESTIAL_IMPLEMENTATION",
          outputs: [
            {
              internalType: "contract Celestial",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "CelestialNameToDetails",
          outputs: [
            {
              internalType: "address",
              name: "walletAddress",
              type: "address",
            },
            {
              internalType: "bool",
              name: "isUsed",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "passwordHash",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "recoveryHash",
              type: "bytes32",
            },
            {
              internalType: "string",
              name: "email",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "salt",
              type: "uint256",
            },
          ],
          name: "createAccount",
          outputs: [
            {
              internalType: "contract Celestial",
              name: "ret",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "proof",
              type: "bytes",
            },
            {
              internalType: "address[]",
              name: "dests",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
            {
              internalType: "bytes[]",
              name: "funcs",
              type: "bytes[]",
            },
          ],
          name: "executeCelestialBatchTx",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "proof",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "_recoveryHash",
              type: "bytes32",
            },
            {
              internalType: "string",
              name: "email",
              type: "string",
            },
          ],
          name: "executeCelestialChangeRecovery",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "proof",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "_passwordHash",
              type: "bytes32",
            },
          ],
          name: "executeCelestialPasskeyRecovery",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "proof",
              type: "bytes",
            },
            {
              internalType: "address",
              name: "dest",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "func",
              type: "bytes",
            },
          ],
          name: "executeCelestialTx",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "passwordHash",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "recoveryHash",
              type: "bytes32",
            },
            {
              internalType: "string",
              name: "email",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "salt",
              type: "uint256",
            },
          ],
          name: "getAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "getCelestial",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "walletAddress",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "isUsed",
                  type: "bool",
                },
              ],
              internalType: "struct CelestialStorage.CelestialDetails",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "forwarder",
              type: "address",
            },
          ],
          name: "isTrustedForwarder",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        CelestialNameToDetails: "contracts/CelestialStorage.sol",
        getCelestial: "contracts/CelestialStorage.sol",
        isTrustedForwarder: "@openzeppelin/contracts/metatx/ERC2771Context.sol",
      },
    },
    CelestialForwarder: {
      address: "0xcbd8EF2d15E11fC65793e693d7D11e918fAfa5D6",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "uint48",
              name: "deadline",
              type: "uint48",
            },
          ],
          name: "ERC2771ForwarderExpiredRequest",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
          ],
          name: "ERC2771ForwarderInvalidSigner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "requestedValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "msgValue",
              type: "uint256",
            },
          ],
          name: "ERC2771ForwarderMismatchedValue",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "target",
              type: "address",
            },
            {
              internalType: "address",
              name: "forwarder",
              type: "address",
            },
          ],
          name: "ERC2771UntrustfulTarget",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "currentNonce",
              type: "uint256",
            },
          ],
          name: "InvalidAccountNonce",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidShortString",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "str",
              type: "string",
            },
          ],
          name: "StringTooLong",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [],
          name: "EIP712DomainChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "ExecutedForwardRequest",
          type: "event",
        },
        {
          inputs: [],
          name: "eip712Domain",
          outputs: [
            {
              internalType: "bytes1",
              name: "fields",
              type: "bytes1",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "version",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "chainId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "verifyingContract",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "salt",
              type: "bytes32",
            },
            {
              internalType: "uint256[]",
              name: "extensions",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "gas",
                  type: "uint256",
                },
                {
                  internalType: "uint48",
                  name: "deadline",
                  type: "uint48",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              internalType: "struct CelestialForwarder.ForwardRequestData",
              name: "request",
              type: "tuple",
            },
          ],
          name: "execute",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "gas",
                  type: "uint256",
                },
                {
                  internalType: "uint48",
                  name: "deadline",
                  type: "uint48",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              internalType: "struct CelestialForwarder.ForwardRequestData[]",
              name: "requests",
              type: "tuple[]",
            },
            {
              internalType: "address payable",
              name: "refundReceiver",
              type: "address",
            },
          ],
          name: "executeBatch",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "nonces",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "gas",
                  type: "uint256",
                },
                {
                  internalType: "uint48",
                  name: "deadline",
                  type: "uint48",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              internalType: "struct CelestialForwarder.ForwardRequestData",
              name: "request",
              type: "tuple",
            },
          ],
          name: "verify",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        eip712Domain: "@openzeppelin/contracts/utils/cryptography/EIP712.sol",
      },
    },
    CelestialSavingManager: {
      address: "0x23c066a80d146d68820F157b74548C9DB3c07C62",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_fromTokenId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_toTokenId",
              type: "uint256",
            },
          ],
          name: "BatchMetadataUpdate",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "_tokenId",
              type: "uint256",
            },
          ],
          name: "MetadataUpdate",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "accountNFTs",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "accounts",
          outputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "lastSummaryTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "redemptionTime",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "deposit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "getAllNFTs",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "mintWeeklyNFT",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "nextNFTId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "redeem",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "time",
              type: "uint256",
            },
          ],
          name: "startAccount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        approve:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        balanceOf:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        getApproved:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        isApprovedForAll:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        name: "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        ownerOf:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        safeTransferFrom:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        setApprovalForAll:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        supportsInterface:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        symbol:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        tokenURI:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        transferFrom:
          "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
    PasskeyUltraVerifier: {
      address: "0x50F1bbb486D62921eD9cE411c6b85Ec0B73D9130",
      abi: [
        {
          inputs: [],
          name: "EC_SCALAR_MUL_FAILURE",
          type: "error",
        },
        {
          inputs: [],
          name: "MOD_EXP_FAILURE",
          type: "error",
        },
        {
          inputs: [],
          name: "PROOF_FAILURE",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "expected",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "actual",
              type: "uint256",
            },
          ],
          name: "PUBLIC_INPUT_COUNT_INVALID",
          type: "error",
        },
        {
          inputs: [],
          name: "PUBLIC_INPUT_GE_P",
          type: "error",
        },
        {
          inputs: [],
          name: "PUBLIC_INPUT_INVALID_BN128_G1_POINT",
          type: "error",
        },
        {
          inputs: [],
          name: "getVerificationKeyHash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_proof",
              type: "bytes",
            },
            {
              internalType: "bytes32[]",
              name: "_publicInputs",
              type: "bytes32[]",
            },
          ],
          name: "verify",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    RecoveryUltraVerifier: {
      address: "0xf1E842Ef0774dBE7CaF7f0F95d1315fD834d2a4b",
      abi: [
        {
          inputs: [],
          name: "EC_SCALAR_MUL_FAILURE",
          type: "error",
        },
        {
          inputs: [],
          name: "MOD_EXP_FAILURE",
          type: "error",
        },
        {
          inputs: [],
          name: "PROOF_FAILURE",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "expected",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "actual",
              type: "uint256",
            },
          ],
          name: "PUBLIC_INPUT_COUNT_INVALID",
          type: "error",
        },
        {
          inputs: [],
          name: "PUBLIC_INPUT_GE_P",
          type: "error",
        },
        {
          inputs: [],
          name: "PUBLIC_INPUT_INVALID_BN128_G1_POINT",
          type: "error",
        },
        {
          inputs: [],
          name: "getVerificationKeyHash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_proof",
              type: "bytes",
            },
            {
              internalType: "bytes32[]",
              name: "_publicInputs",
              type: "bytes32[]",
            },
          ],
          name: "verify",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
