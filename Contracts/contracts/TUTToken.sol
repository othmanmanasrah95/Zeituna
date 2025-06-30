// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TUTToken is ERC20Capped, Ownable {
    address public tourathWallet;
    mapping(address => bool) public hasRegistered;

    // === Events ===
    event Registered(address indexed user);
    event Rewarded(address indexed recipient, uint256 amount, string reason);
    event TreeAdoptionReward(address indexed user, uint256 amount);
    event Redeemed(
        address indexed user,
        uint256 amount,
        uint256 discountPercent
    );
    event ManualMint(address indexed to, uint256 amount);
    event TourathWalletUpdated(address indexed newWallet);

    constructor(
        address initialOwner,
        address _tourathWallet
    )
        ERC20("Tourath Utility Token", "TUT")
        ERC20Capped(10000000 * 10 ** 18)
        Ownable(initialOwner)
    {
        require(_tourathWallet != address(0), "Invalid Tourath wallet");
        tourathWallet = _tourathWallet;

        uint256 initialMint = 10000 * 10 ** decimals();
        _mint(initialOwner, initialMint);
        emit ManualMint(initialOwner, initialMint);
    }

    /// @notice Register and receive 50 TUT (once only)
    function registerWithTUT(address user) external onlyOwner {
        require(!hasRegistered[user], "User already registered");
        hasRegistered[user] = true;

        uint256 rewardAmount = 50 * 10 ** decimals();
        _mint(user, rewardAmount);

        emit Registered(user);
        emit Rewarded(user, rewardAmount, "User Registration");
    }

    /// @notice Reward 1000 TUT when adopting a tree
    /// imprt TUT into ZYT
    function rewardTreeAdoption(address to) external onlyOwner {
        uint256 rewardAmount = 1000 * 10 ** decimals();
        _mint(to, rewardAmount);

        emit TreeAdoptionReward(to, rewardAmount);
        emit Rewarded(to, rewardAmount, "Tree Adoption");
    }

    /// @notice Redeem tokens to get fiat discounts (100 TUT = 1%)
    function redeem(uint256 amount) external {
        require(hasRegistered[msg.sender], "User not registered");
        require(balanceOf(msg.sender) >= amount, "Insufficient TUT balance");
        require(amount >= 100 * 10 ** decimals(), "Min redeem is 100 TUT");

        _transfer(msg.sender, tourathWallet, amount);

        uint256 discountPercent = amount / (100 * 10 ** decimals());
        emit Redeemed(msg.sender, amount, discountPercent);
    }

    /// @notice Reward user with 10% of the order amount (in TUT)
    function rewardPurchase(
        address user,
        uint256 orderAmount
    ) external onlyOwner {
        require(user != address(0), "Invalid user address");
        require(orderAmount > 0, "Order amount must be greater than 0");

        uint256 reward = (orderAmount * 10) / 100;
        uint256 rewardAmount = reward * 10 ** decimals();

        _mint(user, rewardAmount);
        emit Rewarded(user, rewardAmount, "Purchase Reward");
    }

    /// @notice Admin mint with cap check
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount); // Cap enforced by ERC20Capped
        emit ManualMint(to, amount);
        emit Rewarded(to, amount, "Admin Mint");
    }

    /// @notice Change the tourath wallet address
    function setTourathWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Invalid address");
        tourathWallet = newWallet;
        emit TourathWalletUpdated(newWallet);
    }
}
