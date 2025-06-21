const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Zeituna Platform", function () {
  let TUTToken, ZeitunaPlatform, ZYTTreeNFT;
  let tut, platform, zyt;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy TUTToken with initial owner
    const TUTFactory = await ethers.getContractFactory("TUTToken");
    tut = await TUTFactory.deploy(owner.address);
    await tut.deployed();

    // Deploy ZYTTreeNFT with initial owner
    const ZYTFactory = await ethers.getContractFactory("ZYTTreeNFT");
    zyt = await ZYTFactory.deploy(owner.address);
    await zyt.deployed();

    // Deploy ZeitunaPlatform with TUT token and platform wallet
    const PlatformFactory = await ethers.getContractFactory("ZeitunaPlatform");
    platform = await PlatformFactory.deploy(tut.address, owner.address);
    await platform.deployed();

    // Transfer ownership of TUT to platform contract
    await tut.connect(owner).transferOwnership(platform.address);
  });

  it("should reward user with 10% of fiat value in TUT", async function () {
    await platform.connect(owner).rewardUser(user.address, 100);
    const balance = await tut.balanceOf(user.address);
    expect(balance).to.equal(ethers.utils.parseUnits("10", 18));
  });

  it("should redeem TUT and increase total redeemed", async function () {
    await platform.connect(owner).rewardUser(user.address, 200); // 20 TUT
    await tut.connect(user).approve(platform.address, ethers.utils.parseUnits("20", 18));
    await platform.connect(user).redeemTUT(ethers.utils.parseUnits("20", 18));

    const totalRedeemed = await platform.totalRedeemed(user.address);
    expect(totalRedeemed).to.equal(ethers.utils.parseUnits("20", 18));
  });

  it("should correctly apply tiered discount exchange rate", async function () {
    await platform.connect(owner).rewardUser(user.address, 510); // 51 TUT
    await tut.connect(user).approve(platform.address, ethers.utils.parseUnits("51", 18));
    await platform.connect(user).redeemTUT(ethers.utils.parseUnits("51", 18));
    

    const rate = await platform.getExchangeRate(user.address);
    expect(rate).to.equal(175); // 1.75x rate for 51–100 TUT
  });

  it("should mint a ZYT tree NFT", async function () {
    await zyt.connect(owner).mintTree(user.address, "ipfs://test-metadata");
    const ownerOf = await zyt.ownerOf(0);
    expect(ownerOf).to.equal(user.address);
  });
});
