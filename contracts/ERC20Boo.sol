// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; //Kế thừa từ ERC20 cho phép smart contract triển khai các chức năng chuẩn của token ERC20
import "@openzeppelin/contracts/access/Ownable.sol"; //Ownable cung cấp các chức năng quản lý sở hữu cho smart contract.

//trong khi Ownable cung cấp các chức năng quản lý sở hữu cho smart contract.
contract BooToken is ERC20, Ownable {
    constructor() ERC20("LF", "Boo") {
        //được sử dụng để tạo và phân phối 100,000 token cho địa chỉ người tạo smart contract
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
