// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TUTToken is ERC20Capped, Ownable {
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10 ** 18;

    //uint256 public constant INITIAL_REWARD = 50 * 10 ** 18;
    //uint256 public constant TREE_ADOPTION_REWARD = 100 * 10 ** 18;
    //uint256 public constant PLANT_A_TREE_REWARD = 1000 * 10 ** 18;
    uint256 public constant MIN_REDEEM_AMOUNT = 20 * 10 ** 18;

    mapping(address => bool) public authorizedContracts;

    event Rewarded(address indexed to, uint256 amount, string reason);
    event Redeemed(address indexed from, uint256 amount, string reason);

    constructor()
        ERC20("Tourath Utility Token", "TUT")
        ERC20Capped(MAX_SUPPLY)
        Ownable(msg.sender)
    {}

    function reward(
        address recipient,
        uint256 amount,
        string calldata reason
    ) external {
        require(
            msg.sender == owner() || authorizedContracts[msg.sender],
            "Not authorized"
        );
        _mint(recipient, amount);
        emit Rewarded(recipient, amount, reason);
    }

    function redeem(uint256 amount, string calldata reason) external {
        require(amount >= MIN_REDEEM_AMOUNT, "Amount below minimum");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
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
}
