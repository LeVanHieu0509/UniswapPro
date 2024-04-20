async function main() {
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });
  const PEPEATSCHOOL = await ethers.getContractFactory("PEPEATSCHOOL", owner);
  const pepeToken = await PEPEATSCHOOL.deploy();

  console.log("TOKEN_PEPE=", `'${pepeToken.address}'`);
}

/*
              npx hardhat run --network bsctest scripts/pepe/deployToken.js
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
