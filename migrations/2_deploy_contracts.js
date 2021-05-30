// migrations/2_deploy_contracts.js

// Load dependencies
const {deployProxy} = require('@openzeppelin/truffle-upgrades');

// Load compiled artifacts
const Lottery = artifacts.require('Lottery');

module.exports = async function (deployer) {
    await deployProxy(Lottery, {deployer});
    console.log("Lottery deployed to:", Lottery.address);
};
