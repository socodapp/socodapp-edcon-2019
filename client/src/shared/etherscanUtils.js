import { ethers } from 'ethers';
import axios from 'axios';

// const registryAddr = "0x6fff4185512B1a9E2bab8461Be1CCCb625A62064"; // kogan
const registryAddr = "0x988C0f9F747bD95C987D88205A33AB495235E9F4"; // ropsten
const apiKey = "YourApiKeyToken";
// const apiUrl = "https://api-kovan.etherscan.io/api" + "?apikey=" + apiKey
const apiUrl = "https://api-ropsten.etherscan.io/api" + "?apikey=" + apiKey
const logParams = "&module=logs&action=getLogs&fromBlock=0&toBlock=latest";

const balanceParams = "&module=account&action=tokenbalance&tag=latest"
const DAIContractAdrr = "0x7d5E6A841Ec195F30911074d920EEc665A973A2D"

async function reqJSON(url) {
  try {
     const response = await axios.get(url);
     return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

var decodeSocialCommitmentCreated = (data) => {
  return ethers.utils.defaultAbiCoder.decode(["address", "address", "address", "address", "address", "string", "string", "uint256"], data)
}

async function getBalance(accountAddr) {
    const restUrl = apiUrl + balanceParams + "&tokenbalance&contractaddress="+ DAIContractAdrr +"&address=" + accountAddr;
    return await reqJSON(restUrl);
}

export async function getListing() {
  try {
      const restUrl = apiUrl + logParams + "&address=" + registryAddr;
      const json = await reqJSON(restUrl);
      const items = json.map(function (item) {
          const evArgs = decodeSocialCommitmentCreated(item.data);
          return [evArgs[5], evArgs[6], evArgs[0]];
      });
      const pBalances = items.map(item => getBalance(item[2]));
      const balances = await Promise.all(pBalances);
      var retItems = []
      items.forEach(
          (item, i) => retItems.push([item[0], item[1], balances[i]])
          );
      return retItems;
  } catch (error) {
    console.error(error);
    return [];
  }
}
