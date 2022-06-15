//"SPDX-License-Identifier: MIT"
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    uint256 public amount = 1e22;

    constructor() public {}

    function getToken(address _token) external {
        IERC20 token = IERC20(_token);
        uint256 bal = token.balanceOf(address(0));
        require(bal > 0, "Empty faucet");
        bal >= amount
            ? token.transfer(msg.sender, amount)
            : token.transfer(msg.sender, bal);
    }
}
