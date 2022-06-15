//"SPDX-License-Identifier: MIT"
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract BUSD is ERC20Burnable {
    constructor(address _to) public ERC20("Binance USD", "BUSD") {
        _mint(_to, 1e28);
    }
}
