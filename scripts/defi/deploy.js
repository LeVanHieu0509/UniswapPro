async function main() {
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });
  const Token0 = await ethers.getContractFactory("Token0", owner);
  const token0 = await Token0.deploy();

  const Token1 = await ethers.getContractFactory("Token1", owner);
  const token1 = await Token1.deploy();

  console.log("TOKEN0_ADDRESS=", `'${token0.address}'`);
  console.log("TOKEN1_ADDRESS=", `'${token1.address}'`);
}

/*
              npx hardhat run --network localhost scripts/defi/deploy.js
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
