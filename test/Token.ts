import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToken() {
        // Contracts are deployed using the first signer/account by default
        const [owner, addr1, addr2, _] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();

        return { token, owner, addr1, addr2 };
    }
    describe("Deployment", function () {
        it("Should set right owner", async function () {
            const { token, owner } = await loadFixture(deployToken);
            expect(await token.owner()).to.equal(owner.address);
          })
        it("Should assigne owner all the funds", async function () {
            const { token, owner } = await loadFixture(deployToken);
            expect(await token.balanceOf(owner.address)).to.equal(1_000_000_000);
        })
    });
    describe("Transactions", function () {
        it("Should transfer tokens", async function () {
            const { token, owner, addr1, addr2 } = await loadFixture(deployToken);
            // By default the first signer is used
            await token.transfer(addr1.address, 1000, {"from":owner.address})
            expect(await token.balanceOf(addr1.address)).to.equal(1000);

            // Another way of calling a smart contract from an address
            await token.connect(addr1).transfer(addr2.address, 50)
            expect(await token.balanceOf(addr2.address)).to.equal(50);
            expect(await token.balanceOf(addr1.address)).to.equal(950);
        });
        it("Should fail if not enough tokens", async function () {
            const { token, owner, addr1 } = await loadFixture(deployToken);
            const initialBalanceOwner = await token.balanceOf(owner.address);
            console.log(typeof(initialBalanceOwner))
            await expect(
                token
                    .connect(addr1)
                    .transfer(owner.address, 5)
            ).to.be.revertedWith('Not enough tokens');
            expect(await token.balanceOf(owner.address)).to.equal(initialBalanceOwner);
        })
    });
})