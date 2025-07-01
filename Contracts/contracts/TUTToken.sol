// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract TUTToken is ERC20Capped {
    address private immutable _owner;

    uint256 public constant INITIAL_REWARD = 50 * 10 ** 18;
    uint256 public constant TREE_ADOPTION_REWARD = 100 * 10 ** 18;
    uint256 public constant PLANT_A_TREE_REWARD = 1000 * 10 ** 18;
    uint256 public constant MIN_REDEEM_AMOUNT = 20 * 10 ** 18;

    mapping(address => bool) public authorizedContracts;

    event Rewarded(address indexed to, uint256 amount, string reason);
    event Redeemed(address indexed from, uint256 amount, string reason);

    modifier onlyAuthorized() {
        require(
            msg.sender == _owner || authorizedContracts[msg.sender],
            "Not authorized"
        );
        _;
    }

    constructor()
        ERC20("Tourath Utility Token", "TUT")
        ERC20Capped(10_000_000 * 10 ** decimals())
    {
        _owner = msg.sender;
        _mint(_owner, 100_000 * 10 ** decimals());
    }

    function reward(
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorized {
        _mint(recipient, amount);
        emit Rewarded(recipient, amount, reason);
    }

    function redeem(
        address from,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorized {
        require(balanceOf(from) >= amount, "Insufficient balance to redeem");
        _burn(from, amount);
        emit Redeemed(from, amount, reason);
    }

    function addAuthorizedContract(address contractAddress) external {
        require(msg.sender == _owner, "Only owner can authorize");
        authorizedContracts[contractAddress] = true;
    }

    function removeAuthorizedContract(address contractAddress) external {
        require(msg.sender == _owner, "Only owner can deauthorize");
        authorizedContracts[contractAddress] = false;
    }

    function _mint(address to, uint256 amount) internal override(ERC20) {
        super._mint(to, amount);
    }
}
