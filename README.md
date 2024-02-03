# Celestial

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![JavaScript](https://img.shields.io/badge/Javascript-yellow)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-blue)
![Solidity](https://img.shields.io/badge/Solidity-black)
![Noir](https://img.shields.io/badge/Noir-gray)
![LightLink](https://img.shields.io/badge/LightLink-blue)

> Celestial is a smart contract wallet that leverages zero-knowledge proofs for authentication

This project is the implementation for _[Celestial](https://celestial-wallet.vercel.app/)_ hackathon project at [Encode X LightLink Gasless Hackathon](https://www.encode.club/lightlink-hackathon)

Unlike traditional wallets with a defined owner, Celestial operates on the principle that ownership is established through possession of a valid zero-knowledge proof (zk-proof). This wallet introduces a new paradigm in digital asset management, ensuring privacy, security, and optimal performance.

> [!TIP]  
> Celestial is an On-Chain Non-custodial Wallet

## Implementation

- Password Verifier - [0x50F1bbb486D62921eD9cE411c6b85Ec0B73D9130](https://pegasus.lightlink.io/address/0x50F1bbb486D62921eD9cE411c6b85Ec0B73D9130?tab=contract)
- Recovery Verifier - [0xf1E842Ef0774dBE7CaF7f0F95d1315fD834d2a4b](https://pegasus.lightlink.io/address/0xf1E842Ef0774dBE7CaF7f0F95d1315fD834d2a4b?tab=contract)
- Celestial Forwarder - [0xcbd8EF2d15E11fC65793e693d7D11e918fAfa5D6](https://pegasus.lightlink.io/address/0xcbd8EF2d15E11fC65793e693d7D11e918fAfa5D6?tab=contract)
- Celestial Factory - [0x0562eefAD05870Dd74dEE7d08a338182eB86De25](https://pegasus.lightlink.io/address/0x0562eefAD05870Dd74dEE7d08a338182eB86De25?tab=contract)
- Celestial Saving Manager - [0x23c066a80d146d68820F157b74548C9DB3c07C62](https://pegasus.lightlink.io/address/0x23c066a80d146d68820F157b74548C9DB3c07C62?tab=contract)

## Features

- **Zero-Knowledge Proofs (zk-proofs)**: Our wallet relies on zk-proofs for ownership validation, providing a secure and private transaction experience. By employing cutting-edge cryptographic techniques, user data remains confidential on the blockchain.

- **LightLink Integration**: The smart contracts are deployed on the LightLink Pegasus Testnet, offering the advantages of a Layer 2 Ethereum blockchain. Users can enjoy gasless transactions and significantly reduced gas fees compared to the Ethereum mainnet using **Enterprise Mode**.

- **Client-Side Proof Calculation**: Noir allows users to generate zk-proofs locally on their devices. This decentralized approach empowers users to control and verify their proofs before interacting with the smart contract, enhancing the privacy and security of their transactions

- **Savings**: Our Smart Contract Wallet includes an innovative savings feature designed to help users effortlessly grow their savings while managing their digital assets securely. This feature adds a unique dimension to traditional wallet functionalities, promoting financial wellness and goal-oriented saving.

- **Daily NFT Minting** - The wallet mints daily NFTs for users, each containing the total amount saved in the wallet. This unique feature provides users with a tangible representation of their financial progress.

## License

This project is licensed under the [MIT License](LICENSE).

## Authors

- **Anoy Roy Chowdhury** - [AnoyRC](https://github.com/AnoyRC)
- **Gautam Raj** - [Gautam Raj](https://github.com/Gautam25Raj)

## Acknowledgments

- [**LightLink**](https://www.lightlink.io/) : Special thanks to the LightLink team for providing a Layer 2 Ethereum blockchain for gasless transactions.

- [**Aztec Labs**](https://aztec.network/) : Thanks to Aztec Labs for developing the Noir language and providing a secure and private solution for zk-proofs.
