const BTFContract = artifacts.require("BTFile");

module.exports = function(deployer) {
  deployer.deploy(BTFContract);  
};
