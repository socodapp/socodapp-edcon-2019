import {ethers} from 'ethers';

let provider = ethers.getDefaultProvider('mainnet');

export async function ensResolveName(name) {
    try {
        return await provider.resolveName(name);
    } catch {
        return await Promise.resolve(null);
    }
}

export async function ensLookupAddress(addr) {
    const name = await provider.lookupAddress(addr);
    const resolved = await ensResolveName(name);
    return addr === resolved ? name : null;
}

export function isEthereumAddress(value) {
    const re = /^(0x)?[0-9a-fA-f]{40}$/;
    return re.test(value);
}