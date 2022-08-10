import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  // defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    },
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.OWNER_PRIV_KEY || ""],
      chainId: 1287,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.OWNER_PRIV_KEY || ""],
      chainId: 4
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.OWNER_PRIV_KEY || ""],
      chainId: 42
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.OWNER_PRIV_KEY || ""],
      chainId: 1
    },
    hardhat: {
      gasPrice: 470000000000,
      allowUnlimitedContractSize: true,
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;
