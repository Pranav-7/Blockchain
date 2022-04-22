
const hre = require("hardhat");

async function main() {

  const CryptoCoder = await hre.ethers.getContractFactory("CryptoCoder");
  const nfts = await CryptoCoder.deploy();

  await nfts.deployed();

  console.log("nfts deployed to:", nfts.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
