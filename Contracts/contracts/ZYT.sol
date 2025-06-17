// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZYTToken is ERC721URIStorage, Ownable {
    // Counter for token IDs
    uint256 private _nextTokenId;

    // Mapping from token ID to tree ID
    mapping(uint256 => uint256) public treeIds;

    // Mapping from tree ID to token ID to prevent double minting
    mapping(uint256 => bool) public adoptedTrees;

    event TreeAdopted(
        uint256 indexed tokenId,
        uint256 indexed treeId,
        address indexed owner
    );

    constructor() ERC721("Tree Adoption NFT", "ZYT") Ownable(msg.sender) {}

    // Function to mint a new tree adoption NFT
    function mint(
        address to,
        uint256 treeId,
        string memory tokenURI
    ) external onlyOwner {
        require(!adoptedTrees[treeId], "Tree already adopted");
        require(to != address(0), "Invalid recipient address");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        treeIds[tokenId] = treeId;
        adoptedTrees[treeId] = true;

        emit TreeAdopted(tokenId, treeId, to);
    }

    // Function to get the total number of NFTs minted
    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }

    // Function to check if a tree has been adopted
    function isTreeAdopted(uint256 treeId) external view returns (bool) {
        return adoptedTrees[treeId];
    }

    // Function to get the tree ID for a specific token
    function getTreeId(uint256 tokenId) external view returns (uint256) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return treeIds[tokenId];
    }
}
