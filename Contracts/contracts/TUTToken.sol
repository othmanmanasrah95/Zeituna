// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TUTToken is ERC20Capped, Ownable {
    // Custom errors for gas optimization
    error NotAuthorized();
    error AmountBelowMinimum();
    error InsufficientBalance();

    uint256 public constant MAX_SUPPLY = 10_000_000 * 10 ** 18;

    //uint256 public constant INITIAL_REWARD = 50 * 10 ** 18;
    //uint256 public constant TREE_ADOPTION_REWARD = 100 * 10 ** 18;
    //uint256 public constant PLANT_A_TREE_REWARD = 1000 * 10 ** 18;
    uint256 public constant MIN_REDEEM_AMOUNT = 20 * 10 ** 18;

    // Reason codes for rewards and redemptions
    uint256 public constant REASON_INITIAL_REWARD = 1;
    uint256 public constant REASON_TREE_ADOPTION = 2;
    uint256 public constant REASON_PLANT_TREE = 3;
    uint256 public constant REASON_REFERRAL = 4;
    uint256 public constant REASON_ACHIEVEMENT = 5;
    uint256 public constant REASON_REDEMPTION = 10;

    mapping(address => bool) public authorizedContracts;

    event Rewarded(address indexed to, uint256 amount, uint256 reason);
    event Redeemed(address indexed from, uint256 amount, uint256 reason);

    constructor()
        ERC20("Tourath Utility Token", "TUT")
        ERC20Capped(MAX_SUPPLY)
        Ownable(msg.sender)
    {}

    function reward(
        address recipient,
        uint256 amount,
        uint256 reason
    ) external {
        if (msg.sender != owner() && !authorizedContracts[msg.sender]) {
            revert NotAuthorized();
        }
        _mint(recipient, amount);
        emit Rewarded(recipient, amount, reason);
    }

    function redeem(uint256 amount, uint256 reason) external {
        if (amount < MIN_REDEEM_AMOUNT) revert AmountBelowMinimum();
        if (balanceOf(msg.sender) < amount) revert InsufficientBalance();
        _burn(msg.sender, amount);
        emit Redeemed(msg.sender, amount, reason);
    }

    function addAuthorizedContract(address contractAddress) external onlyOwner {
        authorizedContracts[contractAddress] = true;
    }

    function removeAuthorizedContract(
        address contractAddress
    ) external onlyOwner {
        authorizedContracts[contractAddress] = false;
    }

    // Batch operations for gas efficiency
    struct RewardData {
        address recipient;
        uint256 amount;
        uint256 reason;
    }

    function batchReward(RewardData[] calldata rewards) external {
        if (msg.sender != owner() && !authorizedContracts[msg.sender]) {
            revert NotAuthorized();
        }
        
        uint256 length = rewards.length;
        for (uint256 i; i < length;) {
            RewardData calldata rewardData = rewards[i];
            _mint(rewardData.recipient, rewardData.amount);
            emit Rewarded(rewardData.recipient, rewardData.amount, rewardData.reason);
            unchecked { ++i; }
        }
    }

    function batchAddAuthorizedContracts(address[] calldata contractAddresses) external onlyOwner {
        uint256 length = contractAddresses.length;
        for (uint256 i; i < length;) {
            authorizedContracts[contractAddresses[i]] = true;
            unchecked { ++i; }
        }
    }
}
