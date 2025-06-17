# Zeituna Impact Redemption Platform

## 🌳 Overview

Zeituna is a modern web platform for managing and promoting olive tree adoption, sustainable product purchases, and environmental impact tracking. It leverages blockchain technology for transparency and rewards, combining a user-friendly frontend, robust backend, and smart contracts.

---

## 🚀 Features

- User registration, authentication, and profile management
- Olive tree adoption with NFT certificates (ERC721)
- Sustainable product marketplace and shopping cart
- TUT token (ERC20) rewards and payments
- Admin dashboard for managing users, products, trees, and transactions
- Real-time statistics and environmental impact tracking
- Secure, role-based access control

---

## 🏗️ Architecture

```
[ User (Browser) ]
        |
        v
[ Frontend (React, Vite, TypeScript, Tailwind CSS) ]
        |
        v
[ Backend (Node.js, Express, MongoDB) ]
        |
        v
[ Blockchain (Ethereum, Smart Contracts: ZYT, TUT) ]
```

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Axios, ethers.js/web3.js
- **Backend:** Node.js, Express, MongoDB, ethers.js/web3.js
- **Smart Contracts:** Solidity (ERC721, ERC20), OpenZeppelin

---

## 📁 Project Structure

```
Zeituna-ImpRed/
├── backend/           # Node.js + Express backend
├── Client/            # React + Vite frontend
├── Contracts/         # Solidity smart contracts
├── DOCUMENTATION.md   # Full system documentation
├── README.md          # Project overview (this file)
└── ...
```

---

## ⚙️ Setup & Installation

### 1. Backend

```bash
cd backend
npm install
# Configure .env (see DOCUMENTATION.md)
npm run dev
```

### 2. Frontend

```bash
cd Client
npm install
# Configure API endpoint in src/config/api.ts
npm run dev
```

### 3. Smart Contracts

- Contracts are in `Contracts/contracts/`
- Deploy using Hardhat, Truffle, or Remix
- See CONTRACTS_DOCUMENTATION.md for details

---

## 🔗 Key Documentation

- [DOCUMENTATION.md](./DOCUMENTATION.md) — Full system and API documentation
- [Contracts/CONTRACTS_DOCUMENTATION.md](./Contracts/CONTRACTS_DOCUMENTATION.md) — Smart contracts
- [Contracts/Integration.md](./Contracts/Integration.md) — Integration architecture
- [Client/docs/COMPONENTS.md](./Client/docs/COMPONENTS.md) — Frontend components

---

## 🛡️ Security & Best Practices

- JWT authentication and role-based access
- Only backend (privileged wallet) can mint NFTs/tokens
- All contract interactions are validated and logged
- On-chain/off-chain data consistency

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please read the documentation and follow best practices for code style and security.

---

## 📄 License

This project is licensed under the MIT License.
