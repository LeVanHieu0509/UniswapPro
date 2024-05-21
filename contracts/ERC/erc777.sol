// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

// Giống như ERC20 , ERC777 là tiêu chuẩn cho các mã thông báo có thể thay thế và
// Tập trung vào việc cho phép các tương tác phức tạp hơn khi giao dịch mã thông báo
// Nó mang các token và Ether lại gần nhau hơn bằng cách cung cấp một trường tương đương msg.value
contract GLDToken is ERC777 {
    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    ) public ERC777("Gold", "GLD", defaultOperators) {
        // defaultOperators: các tài khoản đặc biệt để có thể chuyển mã thông báo thay mặt cho chủ sở hữu của chúng
        _mint(msg.sender, initialSupply, "", "");
    }
}
