import * as contracts from "truffle-contract";
import {web3Injected, currentProvider, activeUser} from "./metamaskUtils";

const definition = require('./contracts/Listing.json');
const commitment = require('./contracts/SocialCommitment.json');

// const listingAddress = '0x34A9706EEc2540A4e4606FeF7b8535A7CFfeE899';
const listingAddress = '0x023933Cb2E5Bc4cca75832730A37CA5Da6c28745';

export const contractAddresses = async () => {
    if (web3Injected()) {
        const Listing = contracts(definition);
        Listing.setProvider(currentProvider());
        const result = await Listing.at(listingAddress)
            .then(async (contract) => {
                const N = (await contract.numberOfCommitments.call()).toNumber();
                return Promise.all(
                    Array(N).fill(0).map((_, i) => i)
                        .map(i => contract.commitmentContracts.call(i))
                )
            })
        return result
    } else {
        return Promise.resolve([])
    }
};

export const deployCommitment = (successBeneficiary, failureBeneficiary, referee, title, description, deadline) => {
    if (web3Injected()) {
        const Listing = contracts(definition);
        Listing.setProvider(currentProvider());
        Listing.at(listingAddress)
            .then(contract => contract.deploy(
                successBeneficiary,
                failureBeneficiary,
                referee,
                title,
                description,
                deadline,
                {from: activeUser()}
            ));
    }
};