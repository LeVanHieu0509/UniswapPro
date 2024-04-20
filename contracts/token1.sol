// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Token1 is ERC20, Ownable {
    uint256 private cap = 800_000_000 * 10 ** uint256(18);

    constructor() ERC20("Token1", "Tok1") {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= cap, "Floppy: cap exceeded");
        _mint(to, amount);
    }
}
