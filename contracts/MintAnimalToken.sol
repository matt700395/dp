// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    function mintAnimalToken() public {
        uint256 animalTokenId = totalSupply() + 1; // tokenid를 매번 1씩 올림

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId); // erc721에서 제공해주는 민팅하는 함수임 
    }
} 