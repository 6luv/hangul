// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MintNft is ERC1155 {
    string public name;
    string public symbol;
    string metadataUri;

    constructor (string memory _name, string memory _symbol, string memory _metadataUri) ERC1155("") {
        name = _name;
        symbol = _symbol;
        metadataUri = _metadataUri;
    }

    function mintNft() public {
        
    }
}