const Listing = artifacts.require("Listing");

const sec = 1; // Ethereum block time resolution is one second
const minute = 60 * sec;
const day = minute * 60 * 24;
const now = () => Math.ceil((new Date()).getTime() / 1000);

module.exports = function (deployer) {
    deployer.then(async () => {
        // const listingAddress = '0x17EFdB2fD6ef7937ef7437b33C36C1688B64428d';
        // const listing = await Listing.at(listingAddress);
        const listing = await Listing.deployed();

        const referee = '0x3840146DD67c0e7E58515958327D4EF80d7ecf53';
        const successBeneficiary = '0x67947F17ce96E135959a0d4D359CEfc040213556';
        const failureBeneficiary = '0x16a26c0CCa97158fbB044CAA2F836974E82982F6';
        const title = "Challenge, fool!";
        const description = "Another day another challenge";
        const deadline = now() + 7 * day;
        await listing.deploy(successBeneficiary, failureBeneficiary, referee, title, description, deadline);
    })
};