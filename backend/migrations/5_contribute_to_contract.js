// const Listing = artifacts.require("Listing");
// const Commitment = artifacts.require("SocialCommitment");
// const ERC20 = artifacts.require("SampleERC20");
//
module.exports = function (deployer) {
//     deployer.then(async () => {
//         const listing = await Listing.deployed();
//         const commitmentAddress = await listing.commitmentContracts(0);
//
//         const commitment = await Commitment.at(commitmentAddress);
//         const DAI = await ERC20.at('0xaD6D458402F60fD3Bd25163575031ACDce07538D');
//         const amount = 100000;
//
//         const contributor = '0x7dddbD7D0AEB365D90A6A8AF1fC33c95f47a4f84';
//         await DAI.approve(commitmentAddress, amount, {from: contributor});
//         await commitment.pledge({from: contributor});
//     })
};