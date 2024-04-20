async function main() {
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });
  const Bitback = await ethers.getContractFactory("BITBACK", owner);
  const bit = await Bitback.deploy();

  console.log("TOKEN1_ADDRESS=", `'${bit.address}'`);
}

/*
              npx hardhat run --network bsctest scripts/bitback/deploy.js
              npx hardhat verify --network bsctest --contract contracts/bitback.sol:BITBACK  0xE7E485D6023312Cd138b8Ccd09A644F25A04E06E
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
