async function main() {
  const [owner, signer2] = await ethers.getSigners();

  //NFT Deploy Section
  const NFTMarketplace = await ethers.getContractFactory("NFTPEPEMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  console.log(`NFTMarketplace ${nftMarketplace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
