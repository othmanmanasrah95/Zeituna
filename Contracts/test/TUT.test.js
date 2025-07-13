const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TUTToken", function () {
  let TUTToken, tut, owner, user1, user2, otherContract;

  const MAX_SUPPLY = ethers.utils.parseEther("10000000");
  const INITIAL_REWARD = ethers.utils.parseEther("50");
  const TREE_REWARD = ethers.utils.parseEther("100");
  const REDEEM_AMOUNT = ethers.utils.parseEther("20");

  beforeEach(async function () {
    [owner, user1, user2, otherContract] = await ethers.getSigners();
    TUTToken = await ethers.getContractFactory("TUTToken");
    tut = await TUTToken.deploy();
    await tut.deployed();
  });

  it("should deploy with 0 total supply", async function () {
    expect(await tut.totalSupply()).to.equal(0);
  });

  it("owner can reward a user", async function () {
    await tut.reward(user1.address, INITIAL_REWARD, "Initial");
    expect(await tut.balanceOf(user1.address)).to.equal(INITIAL_REWARD);
  });

  it("non-owner and non-authorized contract cannot reward", async function () {
    await expect(
      tut.connect(user1).reward(user2.address, TREE_REWARD, "Hack")
    ).to.be.revertedWith("Not authorized");
  });

  it("owner can authorize and deauthorize a contract", async function () {
    await tut.addAuthorizedContract(otherContract.address);
    expect(await tut.authorizedContracts(otherContract.address)).to.be.true;
    await tut.removeAuthorizedContract(otherContract.address);
    expect(await tut.authorizedContracts(otherContract.address)).to.be.false;
  });

  it("authorized contract can reward", async function () {
    await tut.addAuthorizedContract(user1.address);
    await tut.connect(user1).reward(user2.address, TREE_REWARD, "TreeReward");
    expect(await tut.balanceOf(user2.address)).to.equal(TREE_REWARD);
  });

  it("user can redeem their own tokens", async function () {
    await tut.reward(user1.address, TREE_REWARD, "Earned");
    await tut.connect(user1).redeem(REDEEM_AMOUNT, "Spend");
    expect(await tut.balanceOf(user1.address)).to.equal(
      TREE_REWARD.sub(REDEEM_AMOUNT)
    );
  });

  it("user cannot redeem more than they have", async function () {
    await tut.reward(user1.address, TREE_REWARD, "Earned");
    await expect(
      tut.connect(user1).redeem(TREE_REWARD.add(1), "Overspend")
    ).to.be.revertedWith("Insufficient balance");
  });

  it("cannot mint beyond the cap", async function () {
    await tut.reward(user1.address, MAX_SUPPLY, "Cap");
    await expect(
      tut.reward(user2.address, ethers.utils.parseEther("1"), "Overflow")
    ).to.be.revertedWithCustomError(tut, "ERC20ExceededCap");
  });

  it("emits Rewarded and Redeemed events", async function () {
    await expect(tut.reward(user1.address, TREE_REWARD, "Tree"))
      .to.emit(tut, "Rewarded")
      .withArgs(user1.address, TREE_REWARD, "Tree");

    await tut.connect(user1).redeem(REDEEM_AMOUNT, "Use");

    await expect(tut.connect(user1).redeem(REDEEM_AMOUNT, "Use"))
      .to.emit(tut, "Redeemed")
      .withArgs(user1.address, REDEEM_AMOUNT, "Use");
  });
});
