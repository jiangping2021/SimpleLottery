const path = require("path");
// const HDWalletProvider = require("truffle-hdwallet-provider");  // 导入模块
// const mnemonic = "drum wire cactus bachelor hard zebra love spray pill liberty main outer";  //MetaMask的助记词

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        // 指定truffle develop打开的私链端口为8545
        develop: {
            port: 8545
        },
        // Ganache部署的网络名，由自己定义
        ganache: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 7545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
    },

    // Configure your compilers
    compilers: {
        solc: {
            // version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            // settings: {          // See the solidity docs for advice about optimization and evmVersion
            //  optimizer: {
            //    enabled: false,
            //    runs: 200
            //  },
            //  evmVersion: "byzantium"
            // }
        }
    },
};
