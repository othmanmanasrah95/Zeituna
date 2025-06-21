// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TUTToken.sol";

contract ZeitunaPlatform {
    TUTToken public tut;
    address public tourathWallet;
    mapping(address => uint256) public totalRedeemed;

    event TUTRewarded(address indexed user, uint256 fiatSpent, uint256 tutRewarded);
    event TUTRedeemed(address indexed user, uint256 tutAmount, uint256 discountILS);

    constructor(address _tut, address _tourathWallet) {
        tut = TUTToken(_tut);
        tourathWallet = _tourathWallet;
    }

    function rewardUser(address user, uint256 fiatValueILS) external {
        uint256 reward = (fiatValueILS * 10) / 100; // 10% reward
        tut.mint(user, reward * 10 ** tut.decimals());
        emit TUTRewarded(user, fiatValueILS, reward);
    }

    function redeemTUT(uint256 amount) external {
        require(
            tut.transferFrom(msg.sender, tourathWallet, amount),
            "TUT transfer failed"
        );

        uint256 exchangeRate = getExchangeRate(msg.sender);
        uint256 discountILS = (amount * exchangeRate) / 100; // e.g., 125 means 1.25x

        totalRedeemed[msg.sender] += amount;

        emit TUTRedeemed(msg.sender, amount, discountILS);
    }

    function getExchangeRate(address user) public view returns (uint256) {
        uint256 redeemed = totalRedeemed[user];
        if (redeemed <= 10 * 10 ** tut.decimals()) return 100;     // 1.00x
        if (redeemed <= 20 * 10 ** tut.decimals()) return 125;     // 1.25x
        if (redeemed <= 50 * 10 ** tut.decimals()) return 150;     // 1.50x
        if (redeemed <= 100 * 10 ** tut.decimals()) return 175;    // 1.75x
        return 200;                                                // 2.00x
    }
}
