import CPTJson from "../../build/contracts/CPT.json";
import getWeb3 from "./getWeb3";

export const CPTInstance = async () => {
  const contract = require("truffle-contract");
  const CPTContract = contract(CPTJson);
  const web3 = (await getWeb3).web3;
  CPTContract.setProvider(web3.currentProvider);

  const account = web3.eth.accounts[0];
  const CPT = await CPTContract.deployed();
  return CPT;
};
