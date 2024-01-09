// // SPDX-License-Identifier: GPL-2.0-or-later
// pragma solidity >=0.7.6 <0.9.0;

// pragma abicoder v2;

// import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
// import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
// import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
// import "@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol";
// import "hardhat/console.sol";

// contract LiquidityExamples is IERC721Receiver {
//     address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
//     address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

//     //0,01% fee
//     uint24 public constant poolFee = 100; //đại diện cho mức phí 0,01% cho một pool.
//     INonfungiblePositionManager public nonfungiblePositionManager =
//         INonfungiblePositionManager(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266); //Địa chỉ này có thể chỉ tới một hợp đồng ngoại vi hoặc giao diện hợp đồng quản lý vị trí không thay đổi.

//     // note: Represents the deposit of an NFT
//     struct Deposit {
//         address owner;
//         uint128 liquidity;
//         address token0;
//         address token1;
//     }

//     // dev deposits[tokenID] => deposit
//     mapping(uint => Deposit) public deposits; //lưu trữ thông tin về các giao dịch gửi tiền

//     //store token id used in this example
//     uint public tokenId; //lưu trữ tokenId của NFT được gửi tiền gần nhất.

//     //Implementing `onERC721Received` so this contract can receive custody of erc721 token
//     //Hàm này được gọi khi hợp đồng nhận được một token ERC721
//     function onERC721Received(
//         address operator,
//         address,
//         uint _tokenId,
//         bytes calldata
//     ) external override returns (bytes4) {
//         _createDeposit(operator, _tokenId);
//         return this.onERC721Received.selector; //Hàm này gọi hàm _createDeposit để tạo một giao dịch gửi tiền và trả về giá trị this.onERC721Received.selector.
//     }

//     //Đây là một hàm internal để tạo một giao dịch gửi tiền.
//     function _createDeposit(address owner, uint _tokenId) internal {
//         (, , address token0, address token1, , , , uint128 liquidity, , , , ) = nonfungiblePositionManager.positions(
//             _tokenId
//         );

//         //set the owner and data for position
//         //operator is msg.msg.sender
//         deposits[_tokenId] = Deposit({owner: owner, liquidity: liquidity, token0: token0, token1: token1});

//         console.log("token ID", _tokenId);
//         console.log("liquidity", liquidity);

//         tokenId = _tokenId;
//     }

//     //Đây là một hàm public để tạo một vị trí không thay đổi mới (mint) và tạo một giao dịch gửi tiền tương ứng.
//     // Hàm này sẽ chuyển đổi một số lượng cụ thể của DAI và USDC thành một lượng thanh khoản mới.
//     //Sau đó, nó sẽ tạo một giao dịch gửi tiền bằng cách gọi hàm nonfungiblePositionManager.mint(params).
//     // Cuối cùng, nó sẽ kiểm tra và xử lý việc hoàn trả lại số dư không sử dụng cho người gọi hàm.

//     function mintNewPosition() external returns (uint _tokenId, uint128 liquidity, uint amount0, uint amount1) {
//         //For this example, we will provide equal amoints of Liquidity in both assets.
//         //Providing liquidity in both assets means liquidity will be earning fees and is

//         uint amount0ToMint = 100 * 1e18;
//         uint amount1ToMint = 100 * 1e6;

//         //Approve the position manager
//         TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager), amount0ToMint);
//         TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), amount1ToMint);

//         INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
//             token0: DAI,
//             token1: USDC,
//             fee: poolFee,
//             tickLower: TickMath.MIN_TICK,
//             tickUpper: TickMath.MAX_TICK,
//             amount0Desired: amount0ToMint,
//             amount1Desired: amount1ToMint,
//             amount0Min: 0,
//             amount1Min: 0,
//             recipient: address(this),
//             deadline: block.timestamp
//         });

//         // Note that the pool defined by DAI/USDC and fee tier 0.01% must
//         // already be created and initialized in order to mint
//         (_tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);

//         //Create a deposit
//         _createDeposit(msg.sender, _tokenId);

//         //Remove allowance and refund in both assets
//         if (amount0 < amount0ToMint) {
//             TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager), 0);
//             uint refund0 = amount0ToMint - amount0;
//             TransferHelper.safeTransfer(DAI, msg.sender, refund0);
//         }

//         if (amount1 < amount1ToMint) {
//             TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), 0);
//             uint refund1 = amount1ToMint - amount1;
//             TransferHelper.safeTransfer(USDC, msg.sender, refund1);
//         }
//     }

//     //Đây là một hàm public để thu thập tất cả các khoản phí từ vị trí không thay đổi.
//     // Hàm này tạo một yêu cầu thu phí bằng cách gọi hàm nonfungiblePositionManager.collect(params).
//     // Số lượng phí thu được sẽ được trả về và in ra thông qua console.log.

//     function collectAllFees() external returns (uint256 amount0, uint256 amount1) {
//         // nonfungiblePositionManager.safeTransferFrom(msg.sender, address(this), tokenId);

//         //set amount0max and mount1Max to uint256.max to collect all fees
//         //alternatively can set recipient to msg.sender and avoid another transaction in  `sendToOwner`
//         INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager.CollectParams({
//             tokenId: tokenId,
//             recipient: address(this),
//             amount0Max: type(uint128).max,
//             amount1Max: type(uint128).max
//         });

//         (amount0, amount1) = nonfungiblePositionManager.collect(params);

//         console.log("fee 0", amount0);
//         console.log("fee 1", amount1);
//     }

//     //Đây là một hàm public để tăng thanh khoản của vị trí không thay đổi hiện tại.
//     //Hàm này chuyển đổi một số lượng cụ thể của DAI và USDC từ người gọi hàm và sau đó tăng thanh khoản bằng cách gọi hàm
//     function increaseLiquidityCurrentRange(
//         uint256 amountAdd0,
//         uint amountAdd1
//     ) public returns (uint128 liquidity, uint256 amount0, uint256 amount1) {
//         TransferHelper.safeTransferFrom(DAI, msg.sender, address(this), amountAdd0);
//         TransferHelper.safeTransferFrom(USDC, msg.sender, address(this), amountAdd1);

//         TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager), amountAdd0);
//         TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), amountAdd1);

//         INonfungiblePositionManager.IncreaseLiquidityParams memory params = INonfungiblePositionManager
//             .IncreaseLiquidityParams({
//                 tokenId: tokenId,
//                 amount0Desired: amountAdd0,
//                 amount1Desired: amountAdd1,
//                 amount0Min: 0,
//                 amount1Min: 0,
//                 deadline: block.timestamp
//             });

//         (liquidity, amount0, amount1) = nonfungiblePositionManager.increaseLiquidity(params);

//         console.log("liquidity", liquidity);
//         console.log("amount 0 ", amount0);
//         console.log("amount 1", amount1);
//         // send collected feed back to owner
//         _sendToOwner(tokenId, amount0, amount1);
//     }

//     function _sendToOwner(uint256 tokenId, uint256 amount0, uint256 amount1) internal {
//         // get owner of contract
//         address owner = deposits[tokenId].owner;

//         address token0 = deposits[tokenId].token0;
//         address token1 = deposits[tokenId].token1;
//         // send collected fees to owner
//         TransferHelper.safeTransfer(token0, owner, amount0);
//         TransferHelper.safeTransfer(token1, owner, amount1);
//     }

//     // Đây là một hàm public view để truy vấn thông tin về thanh khoản của một vị trí không thay đổi dựa trên tokenId.
//     // Hàm này gọi hàm nonfungiblePositionManager.positions(_tokenId) và trả về giá trị của liquidity.

//     function getLiquidity(uint _tokenId) external view returns (uint128) {
//         (, , , , , , , uint128 liquidity, , , , ) = nonfungiblePositionManager.positions(_tokenId);

//         return liquidity;
//     }

//     //Đây là một hàm public để giảm thanh khoản của vị trí không thay đổi.
//     //Hàm này tạo một yêu cầu giảm thanh khoản bằng cách gọi hàm nonfungiblePositionManager.decreaseLiquidity(params).
//     //Số lượng DAI và USDC được trả về từ việc giảm thanh khoản và in ra thông qua console.log.
//     function decreaseLiquidity(uint128 liquidity) external returns (uint amount0, uint amount1) {
//         INonfungiblePositionManager.DecreaseLiquidityParams memory params = INonfungiblePositionManager
//             .DecreaseLiquidityParams({
//                 tokenId: tokenId,
//                 liquidity: liquidity,
//                 amount0Min: 0,
//                 amount1Min: 0,
//                 deadline: block.timestamp
//             });

//         (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);

//         console.log("amount 0 ", amount0);
//         console.log("amount 1", amount1);
//     }
// }
