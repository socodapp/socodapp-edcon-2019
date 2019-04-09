import { ethers } from 'ethers';

let provider = ethers.getDefaultProvider('ropsten');

export async function ensResolveName(name) {
  try {
    return await provider.resolveName(name);
  } catch (error) {
    console.error(error);
    return name;
  }
}

export async function ensLookupAddress(addr) {
  try {
    return await provider.lookupAddress(addr);
  } catch (error) {
    console.error(error);
    return addr;
  }
}
