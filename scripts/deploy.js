require("dotenv").config();

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
 
  // We get the contract to deploy
  const GIVERS = await hre.ethers.getContractFactory("GIVERS");
  const givers = await GIVERS.deploy(process.env.CHARITY_WALLET, process.env.MARKETING_WALLET);

  console.log("GIVERS deployed at: %s", givers.address);

}
 
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
