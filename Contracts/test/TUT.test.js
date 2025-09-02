const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TUTToken", function () {
  let TUTToken, tut, owner, user1, user2, otherContract;

  const MAX_SUPPLY = ethers.utils.parseEther("10000000");
  const INITIAL_REWARD = ethers.utils.parseEther("50");
  const TREE_REWARD = ethers.utils.parseEther("100");
  const REDEEM_AMOUNT = ethers.utils.parseEther("20");
  
  // Reason codes
  const REASON_INITIAL_REWARD = 1;
  const REASON_TREE_ADOPTION = 2;
  const REASON_PLANT_TREE = 3;
  const REASON_REFERRAL = 4;
  const REASON_ACHIEVEMENT = 5;
  const REASON_REDEMPTION = 10;

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
    await tut.reward(user1.address, INITIAL_REWARD, REASON_INITIAL_REWARD);
    expect(await tut.balanceOf(user1.address)).to.equal(INITIAL_REWARD);
  });

  it("non-owner and non-authorized contract cannot reward", async function () {
    await expect(
      tut.connect(user1).reward(user2.address, TREE_REWARD, REASON_TREE_ADOPTION)
    ).to.be.revertedWithCustomError(tut, "NotAuthorized");
  });

  it("owner can authorize and deauthorize a contract", async function () {
    await tut.addAuthorizedContract(otherContract.address);
    expect(await tut.authorizedContracts(otherContract.address)).to.be.true;
    await tut.removeAuthorizedContract(otherContract.address);
    expect(await tut.authorizedContracts(otherContract.address)).to.be.false;
  });

  it("authorized contract can reward", async function () {
    await tut.addAuthorizedContract(user1.address);
    await tut.connect(user1).reward(user2.address, TREE_REWARD, REASON_TREE_ADOPTION);
    expect(await tut.balanceOf(user2.address)).to.equal(TREE_REWARD);
  });

  it("user can redeem their own tokens", async function () {
    await tut.reward(user1.address, TREE_REWARD, REASON_TREE_ADOPTION);
    await tut.connect(user1).redeem(REDEEM_AMOUNT, REASON_REDEMPTION);
    expect(await tut.balanceOf(user1.address)).to.equal(
      TREE_REWARD.sub(REDEEM_AMOUNT)
    );
  });

  it("user cannot redeem more than they have", async function () {
    await tut.reward(user1.address, TREE_REWARD, REASON_TREE_ADOPTION);
    await expect(
      tut.connect(user1).redeem(TREE_REWARD.add(1), REASON_REDEMPTION)
    ).to.be.revertedWithCustomError(tut, "InsufficientBalance");
  });

  it("cannot mint beyond the cap", async function () {
    await tut.reward(user1.address, MAX_SUPPLY, REASON_INITIAL_REWARD);
    await expect(
      tut.reward(user2.address, ethers.utils.parseEther("1"), REASON_TREE_ADOPTION)
    ).to.be.revertedWithCustomError(tut, "ERC20ExceededCap");
  });

  it("emits Rewarded and Redeemed events", async function () {
    await expect(tut.reward(user1.address, TREE_REWARD, REASON_TREE_ADOPTION))
      .to.emit(tut, "Rewarded")
      .withArgs(user1.address, TREE_REWARD, REASON_TREE_ADOPTION);

    await tut.connect(user1).redeem(REDEEM_AMOUNT, REASON_REDEMPTION);

    await expect(tut.connect(user1).redeem(REDEEM_AMOUNT, REASON_REDEMPTION))
      .to.emit(tut, "Redeemed")
      .withArgs(user1.address, REDEEM_AMOUNT, REASON_REDEMPTION);
  });

  // New tests for batch operations
  it("owner can batch reward multiple users", async function () {
    const rewards = [
      { recipient: user1.address, amount: INITIAL_REWARD, reason: REASON_INITIAL_REWARD },
      { recipient: user2.address, amount: TREE_REWARD, reason: REASON_TREE_ADOPTION }
    ];
    
    await tut.batchReward(rewards);
    
    expect(await tut.balanceOf(user1.address)).to.equal(INITIAL_REWARD);
    expect(await tut.balanceOf(user2.address)).to.equal(TREE_REWARD);
  });

  it("authorized contract can batch reward", async function () {
    await tut.addAuthorizedContract(user1.address);
    
    const rewards = [
      { recipient: user2.address, amount: INITIAL_REWARD, reason: REASON_INITIAL_REWARD }
    ];
    
    await tut.connect(user1).batchReward(rewards);
    expect(await tut.balanceOf(user2.address)).to.equal(INITIAL_REWARD);
  });

  it("non-authorized cannot batch reward", async function () {
    const rewards = [
      { recipient: user2.address, amount: INITIAL_REWARD, reason: REASON_INITIAL_REWARD }
    ];
    
    await expect(
      tut.connect(user1).batchReward(rewards)
    ).to.be.revertedWithCustomError(tut, "NotAuthorized");
  });

  it("owner can batch add authorized contracts", async function () {
    const contracts = [user1.address, user2.address];
    
    await tut.batchAddAuthorizedContracts(contracts);
    
    expect(await tut.authorizedContracts(user1.address)).to.be.true;
    expect(await tut.authorizedContracts(user2.address)).to.be.true;
  });

  it("cannot redeem below minimum amount", async function () {
    await tut.reward(user1.address, TREE_REWARD, REASON_TREE_ADOPTION);
    
    await expect(
      tut.connect(user1).redeem(ethers.utils.parseEther("10"), REASON_REDEMPTION)
    ).to.be.revertedWithCustomError(tut, "AmountBelowMinimum");
  });
});
