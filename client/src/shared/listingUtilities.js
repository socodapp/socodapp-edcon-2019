import * as contracts from "truffle-contract";
import {web3Injected, currentProvider, activeUser} from "./metamaskUtils";

const definition = require('./contracts/Listing.json');
const listingAddress = '0xe7C0Cd59e721360E7DBDacf54bb358b008925D0D';

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