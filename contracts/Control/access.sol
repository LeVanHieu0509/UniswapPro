// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract MyContract is Ownable {
    constructor(address initialOwner) {}

    // RenounceOwnership đối với việc chủ sở hữu từ bỏ đặc quyền quản trị này,
    // Một mô hình phổ biến sau giai đoạn ban đầu với quản trị tập trung đã kết thúc.

    function normalThing() public {
        // anyone can call this normalThing()
    }

    function specialThing() public onlyOwner {
        // only the owner can call specialThing()!
    }
}

// Đây là một ví dụ đơn giản về việc sử dụng AccessControlmã ERC20thông báo để xác định vai trò 'minter',
// Cho phép các tài khoản có mã thông báo này tạo mã thông báo mới:
// Mỗi tài khoản vẫn có thể có nhiều vai trò nếu muốn.
contract AccessControlERC20MintBase is ERC20, AccessControl {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    error CallerNotMinter(address caller);

    constructor(address minter, address burner) ERC20("MyToken", "TKN") {
        // Grant the minter role to a specified account
        _grantRole(MINTER_ROLE, minter);
        _grantRole(BURNER_ROLE, burner);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // cách 1
    function mint(address to, uint256 amount) public {
        // Check that the calling account has the minter role
        if (!hasRole(MINTER_ROLE, msg.sender)) {
            revert CallerNotMinter(msg.sender);
        }
        _mint(to, amount);
    }

    // cách 2
    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    // Để cấp và thu hồi vai trò một cách linh hoạt, bạn sẽ cần trợ giúp từ quản trị viên của vai trò .
    // DEFAULT_ADMIN_ROLE, đóng vai trò là vai trò quản trị viên mặc định cho tất cả các vai trò
    // Tài khoản có vai trò này sẽ có thể quản lý bất kỳ vai trò nào khác,
    // Trừ khi _setRoleAdmin được sử dụng để chọn vai trò quản trị viên mới.
    // Các tài khoản có thể cấp và thu hồi vai trò một cách linh hoạt

    //TimelockController: Kiểm soát truy cập là điều cần thiết để ngăn chặn truy cập trái phép vào các chức năng quan trọng
    // Nếu người triển khai từ bỏ quyền quản trị để chuyển sang khóa thời gian => bị khóa vô thời hạn

    // Với cả vai trò của người đề xuất và người thực thi được chỉ định và khóa thời gian chịu trách nhiệm quản lý riêng,
    // Giờ đây bạn có thể chuyển quyền sở hữu/kiểm soát bất kỳ hợp đồng nào sang khóa thời gian.
}

// Để hạn chế quyền truy cập vào một số chức năng trong hợp đồng của bạn
// Do quản trị viên AccessManaged có thể sửa đổi tất cả các quyền của mình,
// nên chỉ nên giữ một địa chỉ quản trị viên duy nhất được bảo mật dưới lớp quản trị hoặc đa chữ ký

// contract AccessManagedERC20Mint is ERC20, AccessManaged {
//     constructor(address manager) ERC20("MyToken", "TKN") AccessManaged(manager) {}

//     // Minting is restricted according to the manager rules for this function.
//     // The function is identified by its selector: 0x40c10f19.
//     // Calculated with bytes4(keccak256('mint(address,uint256)'))
//     function mint(address to, uint256 amount) public restricted {
//         _mint(to, amount);
//     }
// }
