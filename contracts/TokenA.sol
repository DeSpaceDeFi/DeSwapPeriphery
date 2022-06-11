//"SPDX-License-Identifier: MIT"
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract TokenA is ERC20Burnable {
    constructor() public ERC20("Token A", "TKA") {
        _mint(msg.sender, 1e25); //10m tokens
    }
}
