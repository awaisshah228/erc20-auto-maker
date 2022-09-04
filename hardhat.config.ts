import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import dotenv from "dotenv";
// import App from './src/utils/deployments'
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: process.env.RPC,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      saveDeployments: true,
    },
  },
  paths: {
    deploy: 'deploy',
    deployments: './src/utils/deployments',
    imports: 'imports'
},


  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 1,
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY ?? "",
    },
  },
};

export default config;
