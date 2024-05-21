// // SPDX-License-Identifier: GPL-2.0-or-later
// pragma solidity >=0.7.0 <0.9.0;

// import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
// import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
// import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

// // Tiện ích mở rộng này sẽ theo dõi số dư lịch sử để quyền biểu quyết được
// // lấy từ ảnh chụp nhanh trong quá khứ thay vì số dư hiện tại,
// // Đây là một biện pháp bảo vệ quan trọng ngăn chặn việc bỏ phiếu kép.

// contract MyToken is ERC20, ERC20Permit, ERC20Votes {
//     constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

//     // The functions below are overrides required by Solidity.

//     function _update(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
//         super._update(from, to, amount);
//     }

//     function nonces(address owner) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
//         return super.nonces(owner);
//     }
// }
