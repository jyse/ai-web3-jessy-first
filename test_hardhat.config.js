require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Ul929j9SlZ9Nf5g53YURXk0g5zu1rlTg",
      accounts: [
        "ed7610b3a1b979b7c09df98b3e1e41dd54f4f90c07c178e6a7e6d983b7307833"
      ]
    }
  },
  etherscan: {
    apiKey: "AEDRXVRA4TDK4SE1BTVZI3TV189HSG7VFN"
  }
};
