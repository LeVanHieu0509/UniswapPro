const { expect } = require("chai");
const { ethers } = require("ethers");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwapMultiHopToken", () => {
  let swapMultiToken, accounts, weth, dai, usdc;

  beforeEach(async () => {
    accounts = await ethers.getSigners(1);

    const SwapMultiToken = await ethers.getContractFactory("SwapMultihop");
    swapMultiToken = await SwapMultiToken.deploy();

    await swapMultiToken.deployed();
    console.log("accounts", accounts[0].address);
    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
  });

  it("swapExactInputMultiHop", async () => {
    const amountIn = 10n ** 18n;

    await weth.deposit({ value: amountIn });
    await weth.approve(swapMultiToken.address, amountIn);

    console.log("amountIn", amountIn);
    console.log("weth", weth);

    //Swap
    await swapMultiToken.swapExactInputMultihop(amountIn);

    console.log("DAI balance:", await dai.balanceOf(accounts[0].address));
  });

  it("swapExactOutputMultihop", async () => {
    const wethAmountInMax = 10n ** 18n;
    const daiAmountOut = 100n * 10n ** 18n;

    //DEPOSIT WETH
    await weth.deposit({ value: wethAmountInMax });
    await weth.approve(swapMultiToken.address, wethAmountInMax);

    //Swap
    await swapMultiToken.swapExactOutputMultihop(daiAmountOut, wethAmountInMax);

    console.log("address[0]", accounts[0].address);
    console.log("address[1]", accounts[1].address);

    console.log("DAI balance:", await dai.balanceOf(accounts[0].address));
    console.log("DAI balance:", await dai.balanceOf(accounts[1].address));
  });
});
