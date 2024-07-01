async function main() {
  console.log({ ethers: ethers.getSigners() });
  const [owner, signer2] = await ethers.getSigners();
  console.log({ owner, signer2 });
  const name = "GPTMembership";
  const symbol = "GMT";

  const GPTMembership = await ethers.getContractFactory("GPTMembership", owner);
  const gptMembership = await GPTMembership.deploy(name, symbol);

  console.log("TOKEN_PEPE=", `'${gptMembership.address}'`);
}

/*
             npx hardhat run --network bsctest scripts/chat-gpt/deploy-chat-gpt.js
             npx hardhat verify --network bsctest --contract contracts/chat-gpt/chat-gpt.sol:GPTMembership 0x99c73Ba3eA469dD912aAE83Cc07E4741e6255044 GPTMembership GMT
              */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//0x99c73Ba3eA469dD912aAE83Cc07E4741e6255044
//address owner: 0x8229C4e44c9c43c4656a5d8D7057a2DB416b216B
