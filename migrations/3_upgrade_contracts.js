// migrations/3_upgrade_contracts.js
const Lottery = artifacts.require('Lottery');
const LotteryV2 = artifacts.require('LotteryV2');

const {upgradeProxy} = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    const lottery = await Lottery.deployed();
    const lotteryV2 = await upgradeProxy(lottery.address, LotteryV2, {deployer});
    console.log("Upgraded", lotteryV2.address);
};
