//Migration script for deploying the DocumentVerification contract

var DocumentVerification = artifacts.require("../contracts/DocumentVerification.sol");

module.exports = function(deployer) {
    deployer.deploy(DocumentVerification);
};
