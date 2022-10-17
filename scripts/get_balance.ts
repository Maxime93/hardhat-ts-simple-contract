import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();
    console.log(`Checking balance of account: ${account.address}`)

    const balance = await account.getBalance();
    console.log(`Account balance: ${balance.toString()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
