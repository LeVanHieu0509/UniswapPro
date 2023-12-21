// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    ISwapRouter public constant swapRouter = ISwapRouter("0xf245ff49Fd68d4e6F8d699F529f567ab9116d838");

    address public constant DAI = 0xf245ff49Fd68d4e6F8d699F529f567ab9116d838;
    address public constant WETH9 = 0xf245ff49Fd68d4e6F8d699F529f567ab9116d838;
    address public constant USDC = 0xf245ff49Fd68d4e6F8d699F529f567ab9116d838;

    function swapExactInputString(uint amountIn) external returns (uint amountOut) {
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, msg.sender(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExExactInputSingleParams({
            tokenIn: WETH9,
            tokenOut: DAI,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOutMinimum: 0,
            sqrtPrLimitX96: 0
        });

        amountOut = swapRouter.exacInoutSingle(params);
    }
}
