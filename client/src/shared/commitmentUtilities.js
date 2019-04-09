import * as contracts from "truffle-contract";
import {web3Injected, currentProvider, activeUser} from "./metamaskUtils";

const definition = require('./contracts/SocialCommitment');

export const isReferee = (addr) => {
    if (web3Injected()) {
        const Commitment = contracts(definition);
        Commitment.setProvider(currentProvider());
        return Commitment.at(addr)
            .then(contract => contract.referee.call())
            .then(referee => referee.toLowerCase() === activeUser().toLowerCase())
    }
    return Promise.resolve(false);
};
