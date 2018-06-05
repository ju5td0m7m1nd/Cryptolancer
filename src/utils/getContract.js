import CPLJson from "../../build/contracts/CPL.json";
import getWeb3 from "./getWeb3";

export const CPLInstance = async () => {
  const contract = require("truffle-contract");
  const CPLContract = contract(CPLJson);
  const web3 = (await getWeb3).web3;
  CPLContract.setProvider(web3.currentProvider);

  const account = web3.eth.accounts[0];
  const CPL = await CPLContract.deployed();
  return CPL;
};
