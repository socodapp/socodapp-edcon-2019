const Listing = artifacts.require("Listing");

module.exports = function(deployer) {
    deployer.deploy(Listing);
};
