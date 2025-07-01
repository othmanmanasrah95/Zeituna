# 📄 CHANGELOG.md

## 🔄 Version 1.0.0 (2025-07-01)

---

### ✅ TUTToken.sol

**1.0**
**Summary:**  
The ERC20 utility token for Tourath’s ecosystem (e.g., Zeituna). Implements capped supply, reward/redeem logic, and authorized interactions.

#### ✨ Added

- `ERC20Capped` inheritance with a max supply of **10,000,000 TUT**
- Initial mint of **100,000 TUT** to `msg.sender` (Tourath)
- Generalized `reward(address, amount, reason)` function for issuing TUT rewards
- Generalized `redeem(address, amount, reason)` function for burning user TUT on redeem actions
- `Rewarded` and `Redeemed` events (with string reason)
- `addAuthorizedContract()` and `removeAuthorizedContract()` functions
- `constant` parameters at top for:
  - `INITIAL_REWARD`, `TREE_ADOPTION_REWARD`, `PLANT_A_TREE_REWARD`, `MIN_REDEEM_AMOUNT`

#### 🛠️ Changed

- `msg.sender` is used as `_owner` (no constructor input)
- `_mint` internally overridden from both `ERC20` and `ERC20Capped`

---

### ✅ ZYTTreeNFT.sol

**1.0**
**Summary:**  
ERC721 contract representing olive tree ownership certificates with built-in timestamp tracking and transfer mechanisms for adoption and unadoption.

#### ✨ Added

- `_owner` set to `msg.sender` as immutable (no constructor params)
- `onlyOwnerOrTourath` modifier (allows both `owner()` and `_owner`)
- `Adopted` and `Unadopted` events
- `adoptionTimestamp[tokenId]` tracking (block.timestamp)
- `constant` parameters at the top:
  - `ADOPTION_FEE`, `PLANT_A_TREE_FEE`, `TRH_REWARD_ADOPTION`, `TRH_REWARD_PLANT`, `OLIVE_OIL_REWARD_ADOPTION`, `OLIVE_OIL_REWARD_PLANT`

#### 🛠️ Changed

- Replaced `tourathAddress` constructor parameter with `msg.sender` for ownership
- Replaced `_exists(tokenId)` with `_ownerOf(tokenId) != address(0)` for OpenZeppelin 5.x compatibility
- Minting, adoption, and unadoption functions centralized around `_owner`
