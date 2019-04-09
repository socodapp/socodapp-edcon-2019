import * as contracts from "truffle-contract";
import {web3Injected, currentProvider, activeUser} from "./metamaskUtils";

const definition = require('./contracts/Listing.json');
const listingAddress = '0x023933Cb2E5Bc4cca75832730A37CA5Da6c28745';

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
                { from: activeUser() }
            ));
    }
};