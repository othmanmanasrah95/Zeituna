# Zeituna Smart Contracts Documentation

## Overview

This documentation covers the smart contracts used in the Zeituna platform, located in the `Contracts/contracts` directory. The contracts are written in Solidity and are designed to support the platform's tree adoption and token reward systems.

## Table of Contents

1. [Contracts Summary](#contracts-summary)
2. [ZYTToken (NFT)](#zyttoken-nft)
3. [TUTToken (ERC20)](#tuttoken-erc20)
4. [Deployment & Ownership](#deployment--ownership)
5. [Events](#events)

---

## Contracts Summary

- **ZYTToken**: An ERC721 NFT contract representing symbolic adoption of olive trees. Each NFT is linked to a unique tree and serves as a digital certificate of adoption.
- **TUTToken**: An ERC20 token contract representing the Tree Utility Token (TUT), used for rewards and payments within the Zeituna ecosystem.

---

## ZYTToken (NFT)

**File:** `ZYT.sol`

### Purpose

- Symbolizes the adoption of a specific olive tree by minting an NFT.
- Each NFT is linked to a unique tree ID and can only be minted once per tree.
- Used as a digital certificate for adopters.

### Inheritance

- `ERC721URIStorage` (OpenZeppelin): Standard NFT with metadata storage.
- `Ownable` (OpenZeppelin): Only the contract owner can mint NFTs.

### Key Functions

- `mint(address to, uint256 treeId, string memory tokenURI)`
  - Mints a new NFT to the adopter's address.
  - Associates the NFT with a unique `treeId` and metadata URI.
  - Prevents double adoption of the same tree.
- `totalSupply()`
  - Returns the total number of NFTs minted.
- `isTreeAdopted(uint256 treeId)`
  - Checks if a tree has already been adopted (NFT minted).
- `getTreeId(uint256 tokenId)`
  - Returns the tree ID associated with a given NFT token ID.

### Events

- `TreeAdopted(tokenId, treeId, owner)`
  - Emitted when a new tree adoption NFT is minted.

### Usage Example

```solidity
// Only the contract owner (platform) can mint
zytToken.mint(adopterAddress, treeId, tokenURI);
```

---

## TUTToken (ERC20)

**File:** `TUT.sol`

### Purpose

- Implements the Tree Utility Token (TUT) as an ERC20 token.
- Used for rewards, payments to platform and vendors/farmers.
- Supports minting and controlled transfers to platform/vendor wallets.

### Inheritance

- `ERC20` (OpenZeppelin): Standard fungible token.
- `Ownable` (OpenZeppelin): Only the contract owner can mint tokens and update wallets.

### Key Functions

- `mint(address to, uint256 amount)`
  - Mints new TUT tokens to a specified address (owner only).
- `setPlatformWallet(address newWallet)`
  - Updates the platform wallet address (owner only).
- `setVendorWallet(address newWallet)`
  - Updates the vendor/farmer wallet address (owner only).
- `transferToPlatform(uint256 amount)`
  - Allows any user to transfer tokens directly to the platform wallet.
- `transferToVendor(uint256 amount)`
  - Allows any user to transfer tokens directly to the vendor/farmer wallet.

### Events

- `PlatformWalletUpdated(address newWallet)`
- `VendorWalletUpdated(address newWallet)`

### Usage Example

```solidity
// Minting tokens (owner only)
tutToken.mint(userAddress, 1000 * 1e18);

// User transfers tokens to platform or vendor
tutToken.transferToPlatform(100 * 1e18);
tutToken.transferToVendor(50 * 1e18);
```

---

## Deployment & Ownership

- Both contracts use OpenZeppelin's `Ownable` pattern.
- Only the owner (platform) can mint NFTs or tokens and update wallet addresses.
- Ownership can be transferred if needed for platform upgrades or governance.

---

## Events

- **ZYTToken**: `TreeAdopted(tokenId, treeId, owner)`
- **TUTToken**: `PlatformWalletUpdated(newWallet)`, `VendorWalletUpdated(newWallet)`

---

## Security Considerations

- Only the owner can mint NFTs or tokens, and update critical addresses.
- Prevents double adoption of trees (one NFT per tree).
- Validates addresses to prevent minting or transferring to zero address.

---

## Integration Notes

- The backend should interact with these contracts using a privileged wallet (owner) for minting and administrative actions.
- Users interact with the contracts for token transfers and NFT ownership queries.
