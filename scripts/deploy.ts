import { ethers } from "hardhat";
const fs = require('fs')

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying Token contract with the account: ${deployer.address}`)

    const balance = await deployer.getBalance();
    console.log(`Deplyer account balance: ${balance.toString()}`)

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();
    console.log(`Token contract address: ${token.address}`)

    // Generate ABI
    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    };
    fs.writeFileSync('Token.json', JSON.stringify(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
