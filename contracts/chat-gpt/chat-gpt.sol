// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

/*
    Hợp đồng này cho phép chủ sở hữu (owner) tạo ra các loại thành viên khác nhau, 
    người dùng có thể mua các loại thành viên này và quản lý thông tin liên quan đến các thành viên.

    Chức năng chính của hợp đồng:
    1, Tạo loại thành viên: Chủ sở hữu có thể tạo ra các loại thành viên với tên, chi phí và ngày.
    2, Mua thành viên: Người dùng có thể mua một loại thành viên cụ thể và 
    nhận được một NFT đại diện cho thành viên đó.
    3, Quản lý thông tin thành viên: Hợp đồng lưu trữ và cung cấp thông tin về các loại thành viên, 
    thành viên đã được mua và thông tin thành viên của từng người dùng.
    4, Rút tiền: Chủ sở hữu có thể rút tiền từ hợp đồng.
*/

contract GPTMembership is ERC721 {
    address public owner; //Địa chỉ của chủ sở hữu hợp đồng.
    uint256 public memberShipTypes; //Số lượng loại thành viên.
    uint256 public totalMemberships; //Tổng số thành viên.

    string public MY_CONTRACT = "DAULAT HUSS"; //Một chuỗi bất kỳ để lưu tên hợp đồng.

    //Cấu trúc để lưu thông tin về loại thành viên.
    struct Membership {
        uint256 id;
        string name;
        uint256 cost;
        string date;
    }

    // Cấu trúc để lưu thông tin về thành viên của người dùng.
    struct UserMembership {
        uint256 id;
        uint256 membershipId;
        address addressUser;
        uint256 cost;
        string expriedDay;
    }

    // Lưu thông tin thành viên của từng địa chỉ người dùng.
    mapping(address => UserMembership) userMemberships;

    //  Lưu thông tin về các loại thành viên.
    mapping(uint256 => Membership) memberships;

    //Kiểm tra xem một người dùng đã mua một loại thành viên cụ thể chưa.
    mapping(uint256 => mapping(address => bool)) public hasBought;

    //Lưu địa chỉ của người sở hữu một thành viên cụ thể.
    mapping(uint256 => mapping(uint256 => address)) public membershipTaken;

    //Lưu danh sách các thành viên đã được mua cho từng loại thành viên.
    mapping(uint256 => uint256[]) membershipsTaken;

    // Chỉ cho phép chủ sở hữu hợp đồng gọi hàm này.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    //Hàm khởi tạo, thiết lập chủ sở hữu hợp đồng và tên, ký hiệu cho token ERC721.
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = (msg.sender);
    }

    //Tạo một loại thành viên mới.
    function list(string memory _name, uint256 _cost, string memory _date) public onlyOwner {
        memberShipTypes++;
        memberships[memberShipTypes] = Membership(memberShipTypes, _name, _cost, _date);
    }

    // Mua một thành viên mới.
    // Hàm mint trong hợp đồng Solidity này có nhiệm vụ cho phép người dùng mua một loại thành viên cụ thể bằng cách
    // trả một số tiền và nhận được một NFT đại diện cho thành viên đó

    function mint(uint256 _membershipId, address _user, string memory _expriedDate) public payable {
        require(_membershipId != 0);
        require(_membershipId <= memberShipTypes);

        //Đảm bảo rằng số tiền gửi vào (trong msg.value) phải lớn hơn hoặc bằng chi phí của loại thành viên được chọn.
        require(msg.value >= memberships[_membershipId].cost, "Insiffiecent balance");
        totalMemberships++;

        //Lưu thông tin thành viên của người dùng:
        userMemberships[_user] = UserMembership(
            totalMemberships,
            _membershipId,
            _user,
            memberships[_membershipId].cost,
            _expriedDate
        );

        // Cập nhật trạng thái mua của người dùng:
        // 1. Ghi nhận rằng người dùng đã mua loại thành viên này.
        hasBought[_membershipId][msg.sender] = true;

        // 2. Lưu địa chỉ của người mua với ID thành viên.
        membershipTaken[_membershipId][totalMemberships] = msg.sender;

        // 3. Thêm ID thành viên vào danh sách các thành viên đã được mua của loại thành viên đó.
        membershipsTaken[_membershipId].push(totalMemberships);

        //4. Mint NFT cho người dùng:
        _safeMint(msg.sender, totalMemberships);
    }

    //Lấy thông tin về một loại thành viên cụ thể
    function getMembership(uint256 _membershipId) public view returns (Membership memory) {
        return memberships[_membershipId];
    }

    //Lấy danh sách các thành viên đã được mua của một loại thành viên cụ thể.
    function getMembershipsTaken(uint256 _membershipId) public view returns (uint256[] memory) {
        return membershipsTaken[_membershipId];
    }

    //Rút toàn bộ số tiền trong hợp đồng về địa chỉ của chủ sở hữu.
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");

        require(success);
    }

    // Lấy thông tin thành viên của một người dùng cụ thể.
    function getUserMembership(address _address) public view returns (UserMembership memory) {
        return userMemberships[_address];
    }
}
