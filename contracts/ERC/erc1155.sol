// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

// ERC1155 là một tiêu chuẩn mã thông báo mới nhằm mục đích tận dụng tốt nhất các tiêu chuẩn trước đó để tạo ra một hợp đồng
// mã thông báo tiết kiệm gas và không có khả năng thay thế

// Điểm đặc biệt của ERC1155 là nó sử dụng một hợp đồng thông minh duy nhất để đại diện cho nhiều mã thông báo cùng một lúc
// Sử dụng balanceOf thì phải truyền ID
// Cách tiếp cận này giúp tiết kiệm lượng gas lớn cho các dự án yêu cầu nhiều token

// Sử dụng ERC1155 để theo dõi nhiều vật phẩm trong trò chơi của mình, mỗi vật phẩm sẽ có thuộc tính riêng

// balances: [50,100,1,1,1]

contract GameItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() public ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10 ** 18, "");
        _mint(msg.sender, SILVER, 10 ** 27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10 ** 9, "");
        _mint(msg.sender, SHIELD, 10 ** 9, "");
    }
}

// thể truy vấn số dư của người triển khai:
// gameItems.balanceOf(deployerAddress,3)
// 1000000000

//Chuyển vật phẩm sang tài khoản người chơi
// > gameItems.safeTransferFrom(deployerAddress, playerAddress, 2, 1, "0x0")
// > gameItems.balanceOf(playerAddress, 2)
// 1
// > gameItems.balanceOf(deployerAddress, 2)
// 0

// chuyển hàng loạt vật phẩm sang tài khoản người chơi và nhận số dư của lô:

// > gameItems.safeBatchTransferFrom(deployerAddress, playerAddress, [0,1,3,4], [50,100,1,1], "0x0")
// > gameItems.balanceOfBatch([playerAddress,playerAddress,playerAddress,playerAddress,playerAddress], [0,1,2,3,4])
// [50,100,1,1,1]

// Uri siêu dữ liệu có thể được lấy:

// > gameItems.uri(2)
// "https://game.example/api/item/{id}.json"

//Để nhận được token ERC_1155
contract MyContract is ERC1155Holder {}
