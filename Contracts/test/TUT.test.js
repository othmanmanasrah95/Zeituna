const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TUT Token", function () {
    let TUTToken;
    let tutToken;
    let owner;
    let platformWallet;
    let vendorWallet;
    let user1;
    let user2;

    beforeEach(async function () {
        // Get signers
        [owner, platformWallet, vendorWallet, user1, user2] = await ethers.getSigners();

        // Deploy contract
        TUTToken = await ethers.getContractFactory("TUTToken");
        tutToken = await TUTToken.deploy(platformWallet.address, vendorWallet.address);
        await tutToken.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await tutToken.owner()).to.equal(owner.address);
        });

        it("Should set the correct platform wallet", async function () {
            expect(await tutToken.platformWallet()).to.equal(platformWallet.address);
        });

        it("Should set the correct vendor wallet", async function () {
            expect(await tutToken.vendorWallet()).to.equal(vendorWallet.address);
        });

        it("Should set the correct name and symbol", async function () {
            expect(await tutToken.name()).to.equal("Tree Utility Token");
            expect(await tutToken.symbol()).to.equal("TUT");
        });
    });

    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            const amount = ethers.parseEther("50");
            await tutToken.mint(user1.address, amount);
            expect(await tutToken.balanceOf(user1.address)).to.equal(amount);
        });

        it("Should not allow non-owner to mint tokens", async function () {
            const amount = ethers.parseEther("50");
            await expect(
                tutToken.connect(user1).mint(user2.address, amount)
            ).to.be.revertedWithCustomError(tutToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("Wallet Management", function () {
        it("Should allow owner to update platform wallet", async function () {
            await tutToken.setPlatformWallet(user1.address);
            expect(await tutToken.platformWallet()).to.equal(user1.address);
        });

        it("Should allow owner to update vendor wallet", async function () {
            await tutToken.setVendorWallet(user1.address);
            expect(await tutToken.vendorWallet()).to.equal(user1.address);
        });

        it("Should not allow non-owner to update platform wallet", async function () {
            await expect(
                tutToken.connect(user1).setPlatformWallet(user2.address)
            ).to.be.revertedWithCustomError(tutToken, "OwnableUnauthorizedAccount");
        });

        it("Should not allow setting zero address as platform wallet", async function () {
            await expect(
                tutToken.setPlatformWallet(ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid wallet address");
        });
    });

    describe("Transfers", function () {
        beforeEach(async function () {
            // Mint some tokens to user1
            await tutToken.mint(user1.address, ethers.parseEther("100"));
        });

        it("Should allow transfer to platform wallet", async function () {
            const amount = ethers.parseEther("50");
            await tutToken.connect(user1).transferToPlatform(amount);
            expect(await tutToken.balanceOf(platformWallet.address)).to.equal(amount);
        });

        it("Should allow transfer to vendor wallet", async function () {
            const amount = ethers.parseEther("50");
            await tutToken.connect(user1).transferToVendor(amount);
            expect(await tutToken.balanceOf(vendorWallet.address)).to.equal(amount);
        });

        it("Should not allow transfer with insufficient balance", async function () {
            const amount = ethers.parseEther("200");
            await expect(
                tutToken.connect(user1).transferToPlatform(amount)
            ).to.be.revertedWith("Insufficient balance");
        });

        it("Should not allow transfer of zero amount", async function () {
            await expect(
                tutToken.connect(user1).transferToPlatform(0)
            ).to.be.revertedWith("Amount must be greater than 0");
        });
    });
}); 