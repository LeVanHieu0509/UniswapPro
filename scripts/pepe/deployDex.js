async function main() {
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });
  const DEX = await ethers.getContractFactory("DEX", owner);
  const dex = await DEX.deploy();

  console.log("DEX_ADDRESS=", `'${dex.address}'`);
}

/*
              npx hardhat run --network bsctest scripts/pepe/deployDex.js
              npx hardhat verify --network bsctest --contract contracts/transferToken.sol:PEPEATSCHOOLTESTING  0x41c3fc84F65308a29Cd3Da2AB7F5584F4A978e8b
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
