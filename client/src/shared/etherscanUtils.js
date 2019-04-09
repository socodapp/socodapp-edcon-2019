import { ethers } from 'ethers';
import axios from 'axios';

const registryAddr = "0x6fff4185512B1a9E2bab8461Be1CCCb625A62064";
const apiKey = "YourApiKeyToken";
const apiUrl = "https://api-kovan.etherscan.io/api"
const logParams = "?module=logs&action=getLogs&fromBlock=10706350&toBlock=latest";


async function reqJSON(url) {
  try {
    return axios.get(url).then(response => response.data.result);
  } catch (error) {
    console.error(error);
    return [];
  }
}

var decodeSocialCommitmentCreated = (data) => {
  return ethers.utils.defaultAbiCoder.decode(["address", "address", "address", "address", "address", "string", "string", "uint256"], data)
}


async function getListing() {
  try {
    const restUrl = apiUrl + logParams + "&address=" + registryAddr + "&apikey=" + apiKey;
    const items = await reqJSON(restUrl);
    return items.map(function (item) {
              const evArgs = decodeSocialCommitmentCreated(item.data);
              return [evArgs[5], evArgs[6], evArgs[7]];
          });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getListing;
