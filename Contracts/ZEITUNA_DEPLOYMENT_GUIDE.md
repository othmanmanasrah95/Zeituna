# Zeituna Platform — Full Deployment & Testing Guide (Zero to Hero)

This guide will walk you through everything you need to know to deploy, test, and integrate the Zeituna smart contracts with your frontend and backend, both locally and on public testnets.

---

## 🧰 Prerequisites

1. **Install Node.js** (LTS): https://nodejs.org/
2. **Install MetaMask** browser extension: https://metamask.io/
3. **Install Git**: https://git-scm.com/
4. **Install Hardhat** globally:

```bash
npm install --save-dev hardhat
```

---

## 🚀 Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/zeituna-contracts.git
cd zeituna-contracts
npm install
```

---

## 🛠 Step 2: Project Structure

```
zeituna-contracts/
│
├── contracts/
│   ├── TUTToken.sol
│   ├── ZeitunaPlatform.sol
│   └── ZYTTreeNFT.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
│   └── zeituna.test.js
│
├── hardhat.config.js
└── package.json
```

---

## 🧪 Step 3: Local Testing (Hardhat)

### Run Local Blockchain

```bash
npx hardhat node
```

### Deploy to Local Network

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Test Contracts

```bash
npx hardhat test
```

Expected output:

```
✔ should reward TUT based on fiat value
✔ should redeem TUT and increase totalRedeemed
```

---

## 🌍 Step 4: Deploy to Public Testnet (e.g., Sepolia)

### 🔐 Set Up Environment

1. Get an API key from [Infura](https://infura.io/) or [Alchemy](https://alchemy.com/)
2. Fund your MetaMask wallet with test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
3. Create `.env` file:

```env
PRIVATE_KEY=your_metamask_private_key
INFURA_API_KEY=your_infura_key
```

### Install dotenv

```bash
npm install dotenv
```

### Edit `hardhat.config.js`:

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

### Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 🖥 Step 5: Integrate with Frontend (React + Ethers.js)

### Connect MetaMask and Show Balance

```js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const tut = new ethers.Contract(tutAddress, TUT_ABI, signer);

const balance = await tut.balanceOf(await signer.getAddress());
```

### Approve and Redeem TUT

```js
await tut.approve(platformAddress, amount);
await platform.redeemTUT(amount);
```

---

## 🔧 Step 6: Integrate with Backend (Node.js + Ethers.js)

### Backend Reward After Purchase

```js
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const platform = new ethers.Contract(platformAddress, Platform_ABI, wallet);

await platform.rewardUser(userAddress, purchaseILS);
```

### Mint Tree NFT

```js
const zyt = new ethers.Contract(nftAddress, ZYT_ABI, wallet);
await zyt.mintTree(userAddress, metadataURI);
```

---

## 🧠 Tips

- Use `dotenv` to protect secrets
- Never expose your private key on frontend
- Use MetaMask only for user actions
- Keep a fixed platform wallet to receive redeemed TUT

---

## 📌 Summary of Main Methods

| Contract          | Method         | Usage                        |
| ----------------- | -------------- | ---------------------------- |
| `TUTToken`        | `balanceOf()`  | Check token balance          |
|                   | `approve()`    | Allow spending TUT           |
| `ZeitunaPlatform` | `rewardUser()` | Mint TUT after fiat purchase |
|                   | `redeemTUT()`  | Redeem TUT for discount      |
| `ZYTTreeNFT`      | `mintTree()`   | Mint NFT after tree adoption |

---

## 📈 Loyalty Tiers (Discount Multipliers)

| Total Redeemed TUT | Exchange Rate    |
| ------------------ | ---------------- |
| 0–10 TUT           | 1 TUT = 1 ILS    |
| 11–20 TUT          | 1 TUT = 1.25 ILS |
| 21–50 TUT          | 1 TUT = 1.5 ILS  |
| 51–100 TUT         | 1 TUT = 1.75 ILS |
| 100+ TUT           | 1 TUT = 2 ILS    |

---

## ✅ You’re now ready to build & deploy Zeituna DApp!
