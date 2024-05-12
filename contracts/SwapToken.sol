// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.6 <0.9.0;

pragma abicoder v2; //Khai báo phiên bản của ABIEncoderV2

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol"; //Hợp đồng sử dụng TransferHelper để chuyển tiền
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol"; //thực hiện các hoạt động trao đổi trên Uniswap v3.

// Hợp đồng SwapToken được sử dụng để thực hiện trao đổi token giữa hai địa chỉ token trên Uniswap
contract SwapToken {
    ISwapRouter public immutable swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    //Phí giao dịch cho các giao dịch trên Uniswap
    uint24 public constant poolFee = 3000;

    // Hàm này được sử dụng để thực hiện một trao đổi với một số lượng cố định của token đầu vào
    // và trả lại số lượng tối đa của token đầu ra có thể
    function swapExactInputSingle(
        address token1, //token đầu vào
        address token2, //token đầu ra
        uint256 amountIn //Số lượng token đầu vào mà người dùng muốn trao đổi.
    ) external returns (uint256 amountOut) {
        // Chuyển số lượng token1 được chỉ định vào hợp đồng này
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amountIn);

        //Phê duyệt bộ định tuyến để sử dụng token1
        TransferHelper.safeApprove(token1, address(swapRouter), amountIn);

        //Tham số ExactInputSingleParams được tạo ra với các thông tin cần thiết và
        // sau đó được sử dụng để gọi hàm exactInputSingle từ swapRouter để thực hiện trao đổi.

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: token1, //Địa chỉ hợp đồng của mã thông báo gửi đến
            tokenOut: token2, //Địa chỉ hợp đồng của mã thông báo gửi đi
            fee: poolFee, //Mức phí của nhóm, được sử dụng để xác định hợp đồng nhóm chính xác để thực hiện hoán đổi
            recipient: msg.sender, //địa chỉ đích của mã thông báo gửi đi
            deadline: block.timestamp, // thời gian unix mà sau đó việc hoán đổi sẽ không thành công, để bảo vệ khỏi các giao dịch đang chờ xử lý lâu và sự dao động giá đột ngột
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        // Lệnh gọi `exactInputSingle` thực hiện trao đổi.
        // Hàm trả về số lượng token đầu ra nhận được sau khi trao đổi.
        amountOut = swapRouter.exactInputSingle(params);
    }

    // Hàm này thực hiện một trao đổi với một số lượng cố định của token đầu ra
    // và trả lại số lượng token đầu vào tối đa có thể
    function swapExactOutputSingle(
        address token1,
        address token2,
        uint256 amountOut,
        uint256 amountInMaximum
    ) external returns (uint256 amountIn) {
        // Chuyển số lượng token2 được chỉ định vào hợp đồng này.
        // Trong hàm, số lượng token đầu ra được chuyển vào hợp đồng và sau đó được phê duyệt để sử dụng bởi swapRouter.

        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amountInMaximum);

        // Approve the router to spend the specifed `amountInMaximum` of token2.
        // In production, you should choose the maximum amount to spend based on oracles or other data sources to acheive a better swap.
        TransferHelper.safeApprove(token1, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
            tokenIn: token1,
            tokenOut: token2,
            fee: poolFee,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum,
            sqrtPriceLimitX96: 0
        });

        // Hàm trả về số lượng token đầu vào được chi tiêu để nhận số lượng token đầu ra mong muốn
        amountIn = swapRouter.exactOutputSingle(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(token1, address(swapRouter), 0);
            TransferHelper.safeTransfer(token1, msg.sender, amountInMaximum - amountIn);
        }
    }
}
