// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZYTTreeNFT is ERC721, Ownable {
    address public immutable _owner;
    uint256 private _tokenIdCounter;

    // === Constants for clarity ===
    // uint256 public constant ADOPTION_FEE = 99 * 1e18; // $99 annual fiat
    // uint256 public constant PLANT_A_TREE_FEE = 199 * 1e18; // $199 fiat
    // uint256 public constant TRH_REWARD_ADOPTION = 5; // one-time
    // uint256 public constant TRH_REWARD_PLANT = 10; // one-time
    // uint256 public constant OLIVE_OIL_REWARD_ADOPTION = 750; // in ml
    // uint256 public constant OLIVE_OIL_REWARD_PLANT = 1000; // in ml

    mapping(uint256 => uint256) public adoptionTimestamp;

    event Adopted(uint256 indexed tokenId, address indexed newOwner);
    event Unadopted(uint256 indexed tokenId, address indexed previousOwner);

    constructor() ERC721("Zeituna Tree", "ZYT") Ownable(msg.sender) {
        _owner = msg.sender;
    }

    modifier onlyOwnerOrTourath() {
        require(
            msg.sender == _owner || msg.sender == owner(),
            "Not authorized"
        );
        _;
    }

    function mint(address to) external onlyOwnerOrTourath {
        _tokenIdCounter++;
        _safeMint(to, _tokenIdCounter);
        adoptionTimestamp[_tokenIdCounter] = block.timestamp;
        emit Adopted(_tokenIdCounter, to);
    }

    function adopt(
        uint256 tokenId,
        address newOwner
    ) external onlyOwnerOrTourath {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _transfer(ownerOf(tokenId), newOwner, tokenId);
        adoptionTimestamp[tokenId] = block.timestamp;
        emit Adopted(tokenId, newOwner);
    }

    function unadopt(uint256 tokenId) external onlyOwnerOrTourath {
        address previousOwner = ownerOf(tokenId);
        require(previousOwner != address(0), "Token does not exist");
        _transfer(previousOwner, _owner, tokenId);
        emit Unadopted(tokenId, previousOwner);
    }
}
