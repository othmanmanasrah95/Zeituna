# Integration Guide: Backend, Frontend, and Smart Contracts

## Overview

This document explains how the Zeituna platform's backend, frontend, and smart contracts are connected and communicate. It covers the architecture, data flow, and integration points between the three layers.

---

## System Architecture Diagram

```
[ User (Browser) ]
        |
        v
[ Frontend (React, Vite, Axios) ]
        |
        v
[ Backend (Node.js, Express, MongoDB) ]
        |
        v
[ Blockchain (Ethereum, Smart Contracts: ZYT, TUT) ]
```

---

## Components & Responsibilities

### 1. Frontend (Client)

- Built with React, TypeScript, Vite, and Tailwind CSS
- Handles user interface, authentication, and user actions
- Communicates with the backend via RESTful API (Axios)
- Interacts with smart contracts via web3 libraries (e.g., ethers.js or web3.js) for wallet-based actions (e.g., viewing NFTs, sending tokens)

### 2. Backend (Server)

- Built with Node.js, Express, and MongoDB
- Handles business logic, user authentication, and data persistence
- Exposes RESTful API endpoints for the frontend
- Interacts with smart contracts using a privileged wallet (e.g., via ethers.js or web3.js)
- Mints NFTs and tokens, updates blockchain state, and synchronizes on-chain/off-chain data

### 3. Smart Contracts (Blockchain)

- Written in Solidity (ZYT: ERC721 NFT, TUT: ERC20 Token)
- Deployed on Ethereum or compatible EVM network
- Enforces on-chain logic for tree adoption (NFTs) and token rewards/payments
- Only the backend (owner) can mint NFTs/tokens; users can transfer tokens and view NFT ownership

---

## Data Flow & Communication

### 1. User Registration & Authentication

- User registers or logs in via the frontend
- Frontend sends credentials to backend API
- Backend authenticates user, issues JWT token, and manages user data in MongoDB

### 2. Tree Adoption (NFT Minting)

1. User initiates tree adoption from the frontend
2. Frontend sends adoption request to backend API
3. Backend verifies user, checks tree status, and calls the ZYT smart contract (using a privileged wallet) to mint an NFT to the user's wallet address
4. Backend updates MongoDB with adoption record and transaction details
5. Frontend updates UI to reflect adoption and NFT ownership

### 3. Token Rewards (TUT Minting & Transfers)

1. Upon successful adoption or other rewardable actions, backend mints TUT tokens to the user's wallet by calling the TUT contract
2. Users can view their TUT balance via the frontend (directly from the blockchain or via backend aggregation)
3. Users can transfer TUT tokens to platform or vendor wallets using the frontend (web3 interaction)

### 4. Product Purchases & Transactions

1. User browses products and initiates a purchase via the frontend
2. Frontend sends purchase request to backend API
3. Backend processes order, updates MongoDB, and (if required) interacts with TUT contract for token payments
4. Backend records transaction and updates user/product status

### 5. Admin & Dashboard

- Admins use the frontend dashboard to manage users, products, trees, and transactions
- Backend provides aggregated data and can interact with contracts for administrative actions (e.g., minting, wallet updates)

---

## Integration Points

| Action           | Frontend       | Backend               | Smart Contract        |
| ---------------- | -------------- | --------------------- | --------------------- |
| User Auth        | REST API       | JWT, MongoDB          | -                     |
| Tree Adoption    | REST API, Web3 | NFT mint (web3)       | ZYT (ERC721)          |
| Token Rewards    | REST API, Web3 | TUT mint/transfer     | TUT (ERC20)           |
| Product Purchase | REST API       | Order, TUT transfer   | TUT (ERC20, optional) |
| View NFTs/Tokens | Web3, REST API | Data aggregation      | ZYT, TUT              |
| Admin Actions    | REST API       | Contract admin (web3) | ZYT, TUT              |

---

## Example: Tree Adoption Flow

1. User connects wallet in frontend (MetaMask, WalletConnect, etc.)
2. User clicks "Adopt Tree"; frontend sends request to backend with wallet address and tree ID
3. Backend verifies eligibility, then calls ZYT contract's `mint()` to issue NFT to user
4. Backend records adoption in MongoDB and returns confirmation to frontend
5. Frontend displays NFT ownership and updates UI

---

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios, ethers.js/web3.js
- **Backend:** Node.js, Express, MongoDB, ethers.js/web3.js
- **Smart Contracts:** Solidity (ERC721, ERC20), OpenZeppelin

---

## Security & Best Practices

- Only backend (privileged wallet) can mint NFTs/tokens
- All contract interactions are validated and logged
- JWT authentication for API access
- On-chain/off-chain data consistency is maintained

---

## Notes

- For wallet-based actions (e.g., transferring tokens, viewing NFTs), the frontend uses web3 libraries and requires user signature/approval
- For minting and admin actions, the backend uses a secure wallet (private key not exposed to frontend)
- All sensitive operations are protected by authentication and role-based access control
