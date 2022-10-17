import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    eth_mainnet: {
        url: process.env.ETH_MAINNET_INFURA_URL,
        accounts: [process.env.ETH_MAINNET_PRIVATE_KEY!]
    },
    eth_goerli: {
        url: process.env.ETH_GOERLI_INFURA_URL,
        accounts: [process.env.ETH_GOERLI_PRIVATE_KEY!],
    },
  }
};

export default config;
