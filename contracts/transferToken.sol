// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// interface IERC20 {
//     function totalSupply() external view returns (uint256);
//     function balanceOf(address account) external view returns (uint256);
//     function allowance(address owner, address spender) external view returns (uint256);

//     function transfer(address recipient, uint256 amount) external returns (bool);
//     function approve(address spender, uint256 amount) external returns (bool);
//     function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(address indexed owner, address indexed spender, uint256 value);
// }

// ERC20 trở nên hữu ích cho những thứ như phương tiện trao đổi tiền tệ , quyền biểu quyết , đặt cược , v.v.
// loại tiền tệ nội tệ trong một trò chơi giả định.
contract PEPEATSCHOOL is ERC20, Ownable {
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    uint256 totalSupply_ = 1_000_000_000 * 10 ** uint256(18);

    constructor() ERC20("PEPEATSCHOOL", "PEPEAS") {
        console.log("owner: %s maxcap: %s", msg.sender, totalSupply_);
        _mint(msg.sender, totalSupply_);
        balances[msg.sender] = totalSupply_; //Đặt tổng cung của token và gán tất cả chúng cho địa chỉ của người tạo.
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= totalSupply_, "Floppy: cap exceeded");
        _mint(to, amount);
    }

    function totalSupply() public view override returns (uint256) {
        return totalSupply_; // Trả về tổng số token đang tồn tại.
    }

    // Trả về số lượng token mà một địa chỉ cụ thể sở hữu.
    function balanceOf(address tokenOwner) public view override returns (uint256) {
        return balances[tokenOwner];
    }

    //Cho phép một địa chỉ chuyển token của mình cho một địa chỉ khác, miễn là nó có đủ số dư.
    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    // Thiết lập số lượng token mà một địa chỉ được phép sử dụng thay mặt cho một địa chỉ khác.
    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    // Trả về số lượng token mà một địa chỉ được phép rút từ một địa chỉ khác.
    function allowance(address owner, address delegate) public view override returns (uint) {
        return allowed[owner][delegate];
    }

    //Cho phép một người chi tiêu chuyển token thay mặt cho chủ sở hữu, với điều kiện đủ số dư và giới hạn
    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

// Hợp đồng này đóng vai trò là một sàn giao dịch phi tập trung (DEX) cho token
contract DEX {
    event Bought(uint256 amount);
    event Sold(uint256 amount);

    IERC20 public token;

    constructor() {
        token = new PEPEATSCHOOL();
    }

    // Cho phép người dùng mua token bằng cách gửi ETH đến hợp đồng.
    // Hàm kiểm tra xem hợp đồng có đủ token để bán không và chuyển token đã mua cho người mua.

    function buy() public payable {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    // Cho phép người dùng bán token để đổi lấy ETH.
    // Hàm này yêu cầu người dùng đã chấp thuận cho DEX xử lý số lượng token cụ thể.
    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }
}
