// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(string memory name_, string memory symbol_,uint supply) ERC20(name_, symbol_) {
        _mint(msg.sender,supply  * 10 ** decimals());
    }
}