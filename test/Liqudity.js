const { network, ethers } = require("hardhat");
const { expect } = require("chai");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// check lại địa chỉ
const DAI_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
const USDC_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";

describe("LiquidityExamples", () => {
  let liquidityExamples, accounts, dai, usdc;

  beforeEach(async () => {
    accounts = await ethers.getSigners(1);

    const LiquidityExamples = await ethers.getContractFactory("LiquidityExamples");
    liquidityExamples = await LiquidityExamples.deploy();

    await liquidityExamples.deployed();

    //Các đối tượng DAI và USDC cũng được khởi tạo thông qua giao thức IERC20.
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);

    //unlock DAI and USDC whales
    // được sử dụng để mở khóa tài khoản của người dùng lớn (whale) cho DAI và USDC.
    // Điều này cho phép tài khoản của người dùng chuyển tiền từ tài khoản người dùng lớn sang tài khoản người dùng trong quá trình chuẩn bị cho các ca kiểm thử.
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    });

    //Send DAI and USDC to accounts[0]
    const daiAmount = 1000n * 10n ** 18n;
    const usdcAmount = 1000n * 10n ** 6n;

    const daiWhale = await ethers.getSigners(DAI_WHALE);
    const usdcWhale = await ethers.getSigners(USDC_WHALE);

    const daiBal = await dai.balanceOf(daiWhale.address);
    const usdcBal = await usdc.balanceOf(usdcWhale.address);

    console.log(daiBal, usdcBal, daiAmount, usdcAmount);

    expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount);
    expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcWhale);

    //Sau đó, một số lượng DAI và USDC được chuyển từ tài khoản của người dùng lớn sang tài khoản của accounts[0] thông qua các hàm transfer
    //Mục đích là cung cấp số dư cho tài khoản accounts[0] để thực hiện các hoạt động trong các ca kiểm thử.
    await dai.connect(daiWhale).transfer(accounts[0].address, daiAmount);
    await usdc.connect(usdcWhale).transfer(accounts[0].address, usdcAmount);
  });

  //một số lượng DAI và USDC được chuyển từ tài khoản accounts[0]
  //sang hợp đồng liquidityExamples thông qua các hàm transfer
  it("mintNewPosition", async () => {
    console.log("LiquidityExamples", liquidityExamples.address);
    // const daiAmount = 100n * 10n ** 18n;
    // const usdcAmount = 100n * 10n ** 6n;
    // await dai.connect(accounts[0]).transfer(liquidityExamples.address, daiAmount);
    // await usdc.connect(accounts[0]).transfer(liquidityExamples.address, usdcAmount);
    // //Sau đó, hàm mintNewPosition của liquidityExamples được gọi để tạo một vị trí mới.
    // await liquidityExamples.mintNewPosition();
    // //thông tin về số dư DAI và USDC của tài khoản accounts[0] được in ra thông qua console.log.
    // console.log("DAI balance after add liquidity", await dai.balanceOf(accounts[0].address));
    // console.log("USDC balance after add liquidity", await usdc.balanceOf(accounts[0].address));
  });
});
