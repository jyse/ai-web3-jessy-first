// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Frontmania is ERC721, ERC721Enumerable, Ownable {
using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Frontmania", "FM") {}

    uint256 maxSupply = 13;
    mapping (uint256 => string) private _tokenURIs;

    function _baseURI(string memory CID) internal pure returns (string memory) {
        return string(abi.encodePacked("ipfs://", CID, "/"));
    }

    function safeMint(string memory CID, uint256 value) public payable virtual {
        require(msg.value >= value, "More money please");
        require(totalSupply() <= maxSupply, "You have reached the limit");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _tokenURIs[tokenId] = CID; 
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override virtual returns (string memory) {
        _requireMinted(tokenId);
        string memory baseURI = _baseURI(_tokenURIs[tokenId]);
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")) : "";
    }
}
