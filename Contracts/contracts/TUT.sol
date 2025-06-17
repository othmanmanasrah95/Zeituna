// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TUTToken is ERC20, Ownable {
    // Platform wallet address that receives payments
    address public platformWallet;

    // Vendor/farmer wallet address that receives payments
    address public vendorWallet;

    event PlatformWalletUpdated(address indexed newWallet);
    event VendorWalletUpdated(address indexed newWallet);

    constructor(
        address _platformWallet,
        address _vendorWallet
    ) ERC20("Tree Utility Token", "TUT") Ownable(msg.sender) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        require(_vendorWallet != address(0), "Invalid vendor wallet");
        platformWallet = _platformWallet;
        vendorWallet = _vendorWallet;
    }

    // Function to mint new tokens (only owner)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Function to update platform wallet (only owner)
    function setPlatformWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet address");
        platformWallet = _newWallet;
        emit PlatformWalletUpdated(_newWallet);
    }

    // Function to update vendor wallet (only owner)
    function setVendorWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet address");
        vendorWallet = _newWallet;
        emit VendorWalletUpdated(_newWallet);
    }

    // Function to transfer tokens to platform wallet
    function transferToPlatform(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, platformWallet, amount);
    }

    // Function to transfer tokens to vendor wallet
    function transferToVendor(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, vendorWallet, amount);
    }
}
