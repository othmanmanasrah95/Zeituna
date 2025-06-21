# Zeituna Smart Contracts Integration Guide

This documentation provides a step-by-step guide for integrating the Zeituna platform smart contracts into your frontend and backend systems.

---

## 📦 Contracts Overview

| Contract          | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `TUTToken`        | ERC-20 token used to reward users and redeem for discounts    |
| `ZeitunaPlatform` | Manages reward distribution and redemption with loyalty tiers |
| `ZYTTreeNFT`      | ERC-721 NFT representing adopted olive trees                  |

---

## 🔗 Integration Flow

### 1. Product Purchase (Off-chain)

- User pays fiat (e.g., ILS) to Tourath.
- Backend calls `ZeitunaPlatform.rewardUser()` to mint TUT (10% of order value).

### 2. Token Redemption (On-chain)

- User uses MetaMask to:
  - Approve spending via `TUTToken.approve()`
  - Call `ZeitunaPlatform.redeemTUT()` to redeem TUT for a discount

### 3. Tree Adoption

- Backend calls `ZYTTreeNFT.mintTree()` to mint NFT after adoption

---

## 🧩 Frontend Integration (React + Ethers.js)

### Connect MetaMask and Read TUT Balance

```js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const tut = new ethers.Contract(tutAddress, TUT_ABI, signer);
const balance = await tut.balanceOf(await signer.getAddress());
```

### Approve and Redeem TUT

```js
await tut.approve(zeitunaPlatformAddress, amount);
await zeitunaPlatform.redeemTUT(amount);
```

---

## 🛠 Backend Integration (Node.js + Ethers.js)

### Reward TUT After Fiat Purchase

```js
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const platform = new ethers.Contract(platformAddress, Zeituna_ABI, wallet);

await platform.rewardUser(userAddress, fiatAmountILS);
```

### Mint Tree NFT

```js
const zyt = new ethers.Contract(zytAddress, ZYT_ABI, wallet);
await zyt.mintTree(userAddress, metadataURI);
```

---

## 🔒 Security Notes

- Use `.env` for backend private keys
- Only backend should have access to `mint()` and `rewardUser()` functions
- User wallet interactions must occur through MetaMask

---

## 🗂 Suggested Project Structure

```
/frontend
  /web3
    tut.js
    platform.js
    nft.js

/backend
  /controllers
    rewards.js
    adoption.js
  /services
    web3.js
    contracts.js
```

---

## 📬 Events to Listen To

- `TUTRewarded(address user, uint256 fiatSpent, uint256 tutAmount)`
- `TUTRedeemed(address user, uint256 tutAmount, uint256 discountILS)`

---

## 📈 Tiered Loyalty Rates

| Total Redeemed TUT | Exchange Rate    |
| ------------------ | ---------------- |
| 0–10 TUT           | 1 TUT = 1 ILS    |
| 11–20 TUT          | 1 TUT = 1.25 ILS |
| 21–50 TUT          | 1 TUT = 1.5 ILS  |
| 51–100 TUT         | 1 TUT = 1.75 ILS |
| 100+ TUT           | 1 TUT = 2 ILS    |

---

## ✅ Summary

- All product sales are off-chain
- TUT is used as a loyalty and discount token
- NFTs are used for tree adoption and identity
- Platform wallet receives all redeemed TUT
