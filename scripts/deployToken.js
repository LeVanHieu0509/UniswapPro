async function main() {
  const [owner, signer2] = await ethers.getSigners();

  const PopUp = await ethers.getContractFactory("PopUp", owner);
  const popUp = await PopUp.deploy();

  const Rayyan = await ethers.getContractFactory("Rayyan", owner);
  const rayyan = await Rayyan.deploy();

  const Shoaib = await ethers.getContractFactory("Shoaib", owner);
  const shoaib = await Shoaib.deploy();

  const Tether = await ethers.getContractFactory("Tether", owner);
  const tether = await Tether.deploy();

  const Usdc = await ethers.getContractFactory("UsdCoin", owner);
  const usdc = await Usdc.deploy();

  const WrappedBitcoin = await ethers.getContractFactory("WrappedBitcoin", owner);
  const wrappedBitcoin = await WrappedBitcoin.deploy();

  await tether.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
  await usdc.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
  await wrappedBitcoin.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));

  await popUp.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
  await rayyan.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
  await shoaib.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));

  console.log("TETHER_ADDRESS=", `'${tether.address}'`);
  console.log("USDC_ADDRESS=", `'${usdc.address}'`);
  console.log("WRAPPED_BITCOIN_ADDRESS=", `'${wrappedBitcoin.address}'`);

  console.log("POPUP_ADDRESS=", `'${popUp.address}'`);
  console.log("RAYYAN_ADDRESS=", `'${rayyan.address}'`);
  console.log("SHOAIB_ADDRESS=", `'${shoaib.address}'`);
}

/*
              npx hardhat run --network localhost scripts/deployToken.js
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
