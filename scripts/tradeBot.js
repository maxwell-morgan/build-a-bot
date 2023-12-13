const { ethers } = require ('hardhat');
const config = require ("../config.json");
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.WebSocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
  let command = '0x0102010000000000000000000000000000000900000000000000000000000000000001dAC17F958D2ee523a2206206994597C13D831ec7'
  interpretCommand(command)
}

function interpretCommand(rawCommand) {
  let operation = rawCommand.substring(2,4)
  console.log(operation)

  let condition = rawCommand.substring(4,6)
  console.log(condition)

  let conditionType = rawCommand.substring(6,8)
  console.log(conditionType)

  let changeAmount = rawCommand.substring(8,40)
  console.log(changeAmount)

  let initialValue = rawCommand.substring(40,72)
  console.log(initialValue)

  let tokenAddress = rawCommand.substring(72,112)
  console.log(tokenAddress)
}

main();
