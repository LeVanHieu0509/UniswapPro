// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// ERC20: Là chuẩn cơ bản cho một token ERC-20.
// ERC20Burnable: Cung cấp chức năng để "đốt" token, làm giảm tổng cung.
// Ownable: Quản lý quyền sở hữu của hợp đồng.
// AccessControl: Cho phép gán vai trò cụ thể và quản lý quyền truy cập dựa trên vai trò đó.
// Pausable: Cho phép tạm dừng và tiếp tục các chức năng của hợp đồng.

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract BITBACK is ERC20, Ownable, ERC20Burnable, AccessControl, Pausable {
    //   LockInfo: Một cấu trúc dữ liệu để theo dõi thông tin về các token bị khoá và thời gian chúng được phép mở khoá.
    struct LockInfo {
        uint256 amount;
        uint256 releaseTime;
    }

    // lockedAddresses: Một mapping từ địa chỉ đến danh sách LockInfo, cho phép theo dõi token bị khoá của từng địa chỉ.
    mapping(address => LockInfo[]) public lockedAddresses;

    // TokensLocked và TokensUnlocked: Các sự kiện để ghi lại việc khoá và mở khoá token.
    event TokensLocked(address indexed recipient, uint256 amount, uint256 releaseTime);
    event TokensUnlocked(address indexed recipient, uint256 amount);

    // MINTER_ROLE: Vai trò cho phép người dùng "đúc" (tạo mới) token
    // WITHDRAWER_ROLE: Vai trò cho phép rút token từ hợp đồng.

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");

    // Giới hạn số token có thể rút là 1 triệu token
    uint256 public maxWithdrawAmount = 1e6 * (10 ** 18);
    bool public withdrawEnabled = true;

    //Thiết lập vai trò quản trị và vai trò đúc token khi hợp đồng được triển khai
    constructor() ERC20("BITBACK", "BIT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    // Chức năng quản lý:
    // Cho phép hoặc không cho phép việc rút token.
    function setWithdrawEnabled(bool _enabled) public onlyOwner {
        withdrawEnabled = _enabled;
    }

    //Thiết lập số lượng tối đa có thể rút trong một lần.
    function setMaxWithdrawAmount(uint256 _maxAmount) public onlyOwner {
        maxWithdrawAmount = _maxAmount;
    }

    // "Đúc" token mới và cấp cho một địa chỉ cụ thể.
    function mint(address to, uint256 amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }

    // Chức năng renounceMinter - chuyển quyền đúc token (minter)
    function renounceMinter() public {
        require(hasRole(MINTER_ROLE, msg.sender), "BITBACK: must have minter role to renounce");
        renounceRole(MINTER_ROLE, msg.sender);
    }

    //Rút token từ hợp đồng
    function withdraw(address to, uint256 amount) public {
        require(hasRole(WITHDRAWER_ROLE, msg.sender), "Caller cannot withdraw");
        require(withdrawEnabled, "Withdrawals are not enabled");
        require(amount <= maxWithdrawAmount, "Amount exceeds max withdraw limit");
        _transfer(address(this), to, amount);
    }

    // Gửi token vào hợp đồng.
    function deposit(uint256 amount) public {
        _transfer(msg.sender, address(this), amount);
    }

    // Từ bỏ vai trò đúc token.
    function renounceOwnership() public override onlyOwner {
        super.renounceOwnership();
    }

    // Các hàm còn thiếu được thêm vào như sau:
    function addMinter(address account) public onlyOwner {
        grantRole(MINTER_ROLE, account);
    }

    // Thêm một vai trò có khả năng rút tiền
    function setupWithdrawRole(address account) public onlyOwner {
        _setupRole(WITHDRAWER_ROLE, account);
    }

    // Chức năng chuyển quyền sở hữu có thể được triển khai qua hàm Ownable của OpenZeppelin
    function transferOwnership(address newOwner) public override onlyOwner {
        super.transferOwnership(newOwner);
    }

    // Chức Năng Khoá Token:

    // Chuyển token đến một địa chỉ cụ thể và khoá chúng đến một thời điểm nhất định.

    function transferWithLock(address recipient, uint256 amount, uint256 releaseTime) public onlyRole(MINTER_ROLE) {
        require(recipient != address(0), "BITBACK: transfer to the zero address");
        require(amount > 0, "BITBACK: amount must be greater than zero");

        // Transfer the tokens to the recipient
        _transfer(_msgSender(), recipient, amount);

        // Lock the transferred tokens for the recipient
        LockInfo memory newLockInfo = LockInfo({amount: amount, releaseTime: releaseTime});
        lockedAddresses[recipient].push(newLockInfo);

        emit TokensLocked(recipient, amount, releaseTime);
    }

    // Hàm unlock để mở khoá token, Mở khoá token để chúng có thể được sử dụng.
    function unlock(address recipient) public {
        uint256 totalUnlocked = 0;
        LockInfo[] storage locks = lockedAddresses[recipient];
        require(locks.length > 0, "BITBACK: no tokens to unlock");

        for (uint256 i = 0; i < locks.length; i++) {
            if (locks[i].releaseTime <= block.timestamp && locks[i].amount > 0) {
                totalUnlocked += locks[i].amount;
                locks[i].amount = 0;
            }
        }

        require(totalUnlocked > 0, "BITBACK: no tokens unlocked");

        // Transfer the unlocked tokens to the recipient
        _transfer(address(this), recipient, totalUnlocked);

        emit TokensUnlocked(recipient, totalUnlocked);

        // Clean up any expired locks
        cleanupLocks(recipient);
    }

    // Optional: Cleanup for the lockedAddresses array
    // Dọn dẹp mảng khoản khoá bằng cách loại bỏ các khoản khoá đã được giải phóng.
    function cleanupLocks(address recipient) public {
        LockInfo[] storage locks = lockedAddresses[recipient];
        uint256 length = locks.length;
        uint256 offset = 0;

        for (uint256 i = 0; i < length - offset; i++) {
            if (locks[i].releaseTime <= block.timestamp && locks[i].amount == 0) {
                // Khi một khoản khoá được giải phóng, hãy xóa nó khỏi mảng
                // bằng cách chuyển phần tử cuối cùng của mảng đến vị trí phần tử
                // vừa được giải phóng và sau đó xóa phần tử cuối cùng.
                if (i != length - offset - 1) {
                    locks[i] = locks[length - offset - 1];
                }
                // Điều này sẽ giảm kích thước của mảng sau mỗi lần lặp.
                locks.pop();
                // Tăng offset để bỏ qua vị trí vừa được giải phóng
                offset++;
                // Giảm giá trị của i để kiểm tra lại phần tử mới được chuyển đến vị trí này.
                i--;
            }
        }
    }

    // ------------------ READ SMART CONTRACT -------------------------- //

    // Hàm để lấy tổng số token có thể rút (available balance)
    // Hàm này sẽ tính số lượng token hiện có của một địa chỉ, trừ đi số lượng token đang bị khoá do các điều kiện khoá cụ thể
    // Giả định rằng `lockedAddresses` mapping lưu trữ thông tin khoá token của từng người dùng

    function getAvailableBalance(address lockedAddress) public view returns (uint256) {
        uint256 totalBalance = balanceOf(lockedAddress); // Tổng số token của người dùng
        uint256 lockedBalance = 0; // Khởi tạo số token đang bị khoá là 0

        LockInfo[] storage locks = lockedAddresses[lockedAddress]; // Truy cập vào thông tin khoá của người dùng
        for (uint256 i = 0; i < locks.length; i++) {
            if (locks[i].releaseTime > block.timestamp) {
                // Nếu token vẫn còn trong thời gian khoá, cộng dồn vào số lượng khoá
                lockedBalance += locks[i].amount;
            }
        }

        // Trường hợp tổng số token nhỏ hơn số token đang khoá (dù không thể xảy ra nếu logic đúng đắn)
        // thì trả về 0 để tránh trả về số âm
        if (totalBalance < lockedBalance) {
            return 0;
        }

        // Số lượng token khả dụng sẽ là tổng số token trừ đi số token đang bị khoá
        return totalBalance - lockedBalance;
    }

    //sẽ tính tổng cung lưu thông của token, thường được hiểu là tổng số token đã phát hành trừ đi số token bị khoá hoặc không khả dụng
    function getCirculatingSupplyTotal() public view returns (uint256) {
        uint256 lockedTokensTotal = 0;

        // Giả sử rằng chúng ta có thể lặp qua tất cả các địa chỉ đã bị khoá.
        // Trong thực tế, bạn sẽ cần một cách để theo dõi tất cả các địa chỉ này,
        // có thể thông qua một mảng hoặc một sự kiện và xử lý ngoài chuỗi.
        // Đây chỉ là một giả định, vì Solidity không hỗ trợ lặp qua tất cả các key của một mapping.
        address[] memory allLockedAddresses; // Giả định này cần được xử lý ngoài chuỗi.

        for (uint256 i = 0; i < allLockedAddresses.length; i++) {
            LockInfo[] storage locks = lockedAddresses[allLockedAddresses[i]];

            for (uint256 j = 0; j < locks.length; j++) {
                if (locks[j].releaseTime > block.timestamp) {
                    lockedTokensTotal += locks[j].amount;
                }
            }
        }

        uint256 totalSupply = totalSupply();
        // Trừ đi số token bị khoá khỏi tổng cung để lấy tổng cung lưu thông
        return totalSupply > lockedTokensTotal ? totalSupply - lockedTokensTotal : 0;
    }

    // // Function to get a list of all addresses that have locked tokens
    // function getLockedAddresses() public view returns (address[] memory) {
    //     uint256 totalLocked = 0;

    //     // Đếm số lượng địa chỉ bị khoá
    //     for (uint256 i = 0; i < lockedAddresses.length; i++) {
    //         if (isCurrentlyLocked(lockedAddresses[i])) {
    //             totalLocked++;
    //         }
    //     }

    //     // Tạo một mảng mới để lưu trữ các địa chỉ bị khoá
    //     address[] memory lockedAddressesList = new address[](totalLocked);

    //     // Lặp lại và thêm các địa chỉ bị khoá vào mảng
    //     uint256 index = 0;
    //     for (uint256 i = 0; i < lockedAddresses.length; i++) {
    //         if (isCurrentlyLocked(lockedAddresses[i])) {
    //             lockedAddressesList[index] = lockedAddresses[i];
    //             index++;
    //         }
    //     }

    //     return lockedAddressesList;
    // }

    // Function to get a list of addresses that currently have locked tokens
    // function getLockedAddressesCurrently() public view returns (address[] memory) {
    //     uint256 count = 0;

    //     // First determine the number of currently locked addresses
    //     for (uint256 i = 0; i < lockedAddresses.length; i++) {
    //         if (addressIsLocked[lockedAddresses[i]] && isCurrentlyLocked(lockedAddresses[i])) {
    //             count++;
    //         }
    //     }

    //     // Now create an array of that size
    //     address[] memory addresses = new address[](count);
    //     uint256 index = 0;

    //     // Populate the array with the addresses that are currently locked
    //     for (uint256 i = 0; i < lockedAddresses.length; i++) {
    //         if (addressIsLocked[lockedAddresses[i]] && isCurrentlyLocked(lockedAddresses[i])) {
    //             addresses[index] = lockedAddresses[i];
    //             index++;
    //         }
    //     }

    //     return addresses;
    // }

    // Assuming isCurrentlyLocked is a function that checks if an address has tokens locked at the current time
    function isCurrentlyLocked(address account, uint256 index) internal view returns (bool) {
        return
            lockedAddresses[account][index].releaseTime > block.timestamp && lockedAddresses[account][index].amount > 0;
    }

    // Hàm để lấy tổng số lượng địa chỉ đã khoá

    function getNumberOfLockedAddresses() public view returns (uint256) {
        return lockedAddresses[msg.sender].length;
    }

    // Hàm để lấy số lượng địa chỉ có token đang bị khoá hiện tại
    function getNumberOfLockedAddressesCurrently() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < lockedAddresses[msg.sender].length; i++) {
            if (isCurrentlyLocked(msg.sender, i)) {
                count++;
            }
        }
        return count;
    }

    // Hàm kiểm tra xem tài khoản có phải là minter hay không
    function isMinter(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    // Hàm kiểm tra xem tài khoản có phải là chủ sở hữu hay không
    function isOwner(address account) public view returns (bool) {
        return owner() == account;
    }

    // Hàm để lấy thông tin về token bị khoá cho một địa chỉ cụ thể
    // Hàm để lấy thông tin về token bị khoá cho một địa chỉ cụ thể
    function lockList(address account) public view returns (LockInfo[] memory) {
        uint256 numLocks = lockedAddresses[account].length;
        LockInfo[] memory accountLocks = new LockInfo[](numLocks);

        for (uint256 i = 0; i < numLocks; i++) {
            LockInfo storage lockInfo = lockedAddresses[account][i];
            accountLocks[i] = lockInfo; // Sao chép dữ liệu vào mảng mới trong bộ nhớ
        }

        return accountLocks; // Trả về mảng bộ nhớ
    }

    function addressIsLocked(address account) internal view returns (bool) {
        LockInfo[] storage locks = lockedAddresses[account];
        for (uint256 i = 0; i < locks.length; i++) {
            if (locks[i].releaseTime > block.timestamp && locks[i].amount > 0) {
                return true; // There's at least one lock that's still active
            }
        }
        return false; // No locks are currently active
    }
}
