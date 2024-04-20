async function main() {
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });

  const CPAMM = await ethers.getContractFactory("CPAMM", owner);
  const cpamm = await CPAMM.deploy(
    "0x8A114E450cAa448aCD473104e4d7F8467A692aAa",
    "0xe7B757f0c3636223BD4e61F667405418e6d8a1dc"
  );

  console.log("CPAMM=", `'${cpamm.address}'`);
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
