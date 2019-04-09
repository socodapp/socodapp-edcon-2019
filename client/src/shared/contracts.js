import * as contract from 'truffle-contract';

const Listing = require('./build/Listing.json');

export let definitions = {
    Listing: contract(Listing)
}