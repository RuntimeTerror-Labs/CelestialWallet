//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./utils/Conversion.sol";

contract CelestialSavingManager is ERC721URIStorage, Ownable {
    uint256 public nextNFTId;

    struct Account {
        uint256 balance;
        uint256 lastSummaryTime;
        uint256 redemptionTime;
    }

    mapping(address => Account) public accounts;
    mapping(address => uint256[]) public accountNFTs;

    constructor() ERC721("SummaryNFT", "SNFT") {
        nextNFTId = 1;
    }

    modifier isValidAccount(address account) {
        require(accounts[account].redemptionTime > 0, "Invalid account");
        _;
    }

    function startAccount(uint256 time) external {
        require(accounts[msg.sender].balance == 0, "Account already started");
        require(time > block.timestamp, "Invalid time");
        accounts[msg.sender] = Account(0, block.timestamp, time);
    }

    function deposit() external payable isValidAccount(msg.sender) {
        accounts[msg.sender].balance += msg.value;   
    }

    function mintWeeklyNFT(address account) public isValidAccount(account) {
        if (block.timestamp > accounts[account].lastSummaryTime + 1 days) {
            uint256 balance = accounts[account].balance;
            string memory tokenURI = string(abi.encodePacked("data:application/json;base64,", Conversion.encodeDetails(account, balance)));
            _mint(account, nextNFTId);
            _setTokenURI(nextNFTId, tokenURI);
            accountNFTs[account].push(nextNFTId);
            nextNFTId++;
            accounts[account].lastSummaryTime = block.timestamp;
        }
    }

    function redeem() external isValidAccount(msg.sender) {
        require(block.timestamp > accounts[msg.sender].redemptionTime, "Cannot redeem yet");
        uint256 amount = accounts[msg.sender].balance;
        accounts[msg.sender].balance = 0;
        payable(msg.sender).transfer(amount);
        accounts[msg.sender].redemptionTime = 0;
    }
}