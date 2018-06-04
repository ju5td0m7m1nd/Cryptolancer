var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var CPL = artifacts.require("./CPL.sol");
var CPT = artifacts.require("./CPT.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(CPL);
  deployer.deploy(CPT);
};
