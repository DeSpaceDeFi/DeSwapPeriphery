//"SPDX-License-Identifier: MIT"
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract DES is ERC20Burnable {
    constructor(address _to) public ERC20("Despace Token", "DES") {
        _mint(_to, 1e30);
    }
}
