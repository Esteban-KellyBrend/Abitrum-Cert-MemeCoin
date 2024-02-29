import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("KelToken", ["0x1700ecA3a44337b8Cb1c8b0C9Fc63671e9236dFb"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});