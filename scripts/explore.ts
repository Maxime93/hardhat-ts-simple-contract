import { ethers } from "hardhat";

async function main() {
    const [owner, addr1, addr2, _] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log(`Deployed Token contract`);

    let ownerBalance = await token.balanceOf(owner.address);
    console.log(ownerBalance)
    console.log(typeof(ownerBalance))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
