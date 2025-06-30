// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZYTTreeNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;
    mapping(uint256 => bool) public isAdopted;

    event TreeAdopted(address indexed user, uint256 tokenId, string uri);
    event TreeUnadopted(address indexed user, uint256 tokenId);

    constructor(
        address initialOwner
    ) ERC721("Zeituna Tree NFT", "ZYT") Ownable(initialOwner) {}

    /// @notice Mint a new NFT for a tree adoption
    function mintTreeNFT(
        address to,
        string memory tokenURI
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        isAdopted[tokenId] = true;
        nextTokenId++;

        emit TreeAdopted(to, tokenId, tokenURI);
        return tokenId;
    }

    /// @notice Burn an NFT (e.g. expired adoption or cancellation)
    function burnTreeNFT(uint256 tokenId) external onlyOwner {
        address ownerOfToken = ownerOf(tokenId);
        _burn(tokenId);
        isAdopted[tokenId] = false;

        emit TreeUnadopted(ownerOfToken, tokenId);
    }

    /// @notice Check if a tree is currently adopted
    function isTreeAdopted(uint256 tokenId) external view returns (bool) {
        return isAdopted[tokenId];
    }
}
