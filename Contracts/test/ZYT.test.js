const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZYT Token", function () {
    let ZYTToken;
    let zytToken;
    let owner;
    let user1;
    let user2;
    let mintedTokenId;

    beforeEach(async function () {
        // Get signers
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy contract
        ZYTToken = await ethers.getContractFactory("ZYTToken");
        zytToken = await ZYTToken.deploy();
        await zytToken.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await zytToken.owner()).to.equal(owner.address);
        });

        it("Should set the correct name and symbol", async function () {
            expect(await zytToken.name()).to.equal("Tree Adoption NFT");
            expect(await zytToken.symbol()).to.equal("ZYT");
        });

        it("Should start with zero total supply", async function () {
            expect(await zytToken.totalSupply()).to.equal(0);
        });
    });

    describe("Minting", function () {
        const treeId = 1;
        const tokenURI = "ipfs://QmTest123";

        it("Should allow owner to mint NFT", async function () {
            const tx = await zytToken.mint(user1.address, treeId, tokenURI);
            const receipt = await tx.wait();
            
            const event = receipt.logs.find(log => log.fragment?.name === 'TreeAdopted');
            mintedTokenId = event.args.tokenId;

            expect(await zytToken.ownerOf(mintedTokenId)).to.equal(user1.address);
            expect(await zytToken.getTreeId(mintedTokenId)).to.equal(treeId);
            expect(await zytToken.tokenURI(mintedTokenId)).to.equal(tokenURI);
            expect(await zytToken.isTreeAdopted(treeId)).to.be.true;
        });

        it("Should not allow non-owner to mint NFT", async function () {
            await expect(
                zytToken.connect(user1).mint(user2.address, treeId, tokenURI)
            ).to.be.revertedWithCustomError(zytToken, "OwnableUnauthorizedAccount");
        });

        it("Should not allow minting NFT for already adopted tree", async function () {
            await zytToken.mint(user1.address, treeId, tokenURI);
            
            await expect(
                zytToken.mint(user2.address, treeId, tokenURI)
            ).to.be.revertedWith("Tree already adopted");
        });

        it("Should not allow minting to zero address", async function () {
            await expect(
                zytToken.mint(ethers.ZeroAddress, treeId, tokenURI)
            ).to.be.revertedWith("Invalid recipient address");
        });
    });

    describe("Tree Information", function () {
        const treeId = 1;
        const tokenURI = "ipfs://QmTest123";

        beforeEach(async function () {
            const tx = await zytToken.mint(user1.address, treeId, tokenURI);
            const receipt = await tx.wait();
            const event = receipt.logs.find(log => log.fragment?.name === 'TreeAdopted');
            mintedTokenId = event.args.tokenId;
        });

        it("Should correctly track adopted trees", async function () {
            expect(await zytToken.isTreeAdopted(treeId)).to.be.true;
            expect(await zytToken.isTreeAdopted(2)).to.be.false;
        });

        it("Should correctly associate token IDs with tree IDs", async function () {
            expect(await zytToken.getTreeId(mintedTokenId)).to.equal(treeId);
        });

        it("Should revert when getting tree ID for non-existent token", async function () {
            await expect(
                zytToken.getTreeId(999)
            ).to.be.revertedWithCustomError(zytToken, "ERC721NonexistentToken");
        });
    });

    describe("Token URI", function () {
        const treeId = 1;
        const tokenURI = "ipfs://QmTest123";

        beforeEach(async function () {
            const tx = await zytToken.mint(user1.address, treeId, tokenURI);
            const receipt = await tx.wait();
            const event = receipt.logs.find(log => log.fragment?.name === 'TreeAdopted');
            mintedTokenId = event.args.tokenId;
        });

        it("Should return correct token URI", async function () {
            expect(await zytToken.tokenURI(mintedTokenId)).to.equal(tokenURI);
        });

        it("Should revert when getting URI for non-existent token", async function () {
            await expect(
                zytToken.tokenURI(999)
            ).to.be.revertedWithCustomError(zytToken, "ERC721NonexistentToken");
        });
    });
}); 