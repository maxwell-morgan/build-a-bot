const { expect } = require ('chai');
const { ethers } = require ('hardhat');

const tokens = (n) => {
  return(ethers.utils.parseUnits(n.toString(), 18).toString())
};

describe("ProxyTrader", () => {
  let transaction, result, proxyTrader, token, accounts, deployer, user1

  beforeEach(async () => {
    const ProxyTrader = await ethers.getContractFactory("ProxyTrader")
    console.log("Test 1")
    proxyTrader = await ProxyTrader.deploy("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    console.log("Test 2")

    const Token = await ethers.getContractFactory("Token")
    token = await Token.deploy("Dapp University", "DAPP", "100000000")

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]

    transaction = await token.connect(deployer).transfer(proxyTrader.address, tokens(100000000))
    result = await transaction.wait()

  })

  describe("Deployment", () => {

    it("sets correct owner", async () => {
      expect(await proxyTrader.owner()).to.equal(deployer.address)
    });

    it("", async () => {

    });
  });

  describe("Withdraw", () => {

    describe("Success", () => {

      beforeEach(async () => {
        transaction = await proxyTrader.connect(deployer).withdraw_erc20(tokens(10), token.address)
        result = await transaction.wait()
      })

      it("withdraws correct amount", async () => {
        expect(await token.balanceOf(deployer.address)).to.equal(tokens(10))
      });

      it("goes to correct address", async () => {
      
      });

      it("only owner can withdraw", async () => {

      });

    });

  });

});
