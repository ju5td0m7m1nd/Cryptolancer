var CPL = artifacts.require("./CPL.sol");
var CPT = artifacts.require("./CPT.sol");

contract("CPL", function(accounts) {
  it("...should create project.", async () => {
    const cpl = await CPL.deployed();
    cpl.createProject("Frismo", "abc", 1000, { from: accounts[0] });
    const response = await cpl.getContract.call(accounts[0], 0);
    assert.equal(response[0], "abc", "Contract created.");
  });
  it("...should assign contracter", async () => {
    const cpl = await CPL.deployed();
    await cpl.assignContract(accounts[1], "abc", { from: accounts[0] });
    const response = await cpl.getContractFree.call(accounts[1], 0);
    assert.equal(response[0], "abc", "Contract assigned.");
  });

  it("...should update the contract from owner", async () => {
    const cpl = await CPL.deployed();
    await cpl.updateContractFromOwner("abc", "def", { from: accounts[0] });
    const response = await cpl.getContract.call(accounts[0], 0);
    assert.equal(response[0], "def", "Contract updated from owner.");
  });

  it("...should update the contract from contractor", async () => {
    const cpl = await CPL.deployed();
    await cpl.updateContractFromFreelancer("def", "ghi", { from: accounts[1] });
    const response = await cpl.getContractFree.call(accounts[1], 0);
    assert.equal(response[0], "ghi", "Contract updated from contractor.");
  });

  it("...should update the contract from applicant", async () => {
    const cpl = await CPL.deployed();
    await cpl.updateContractFromApplicant("ghi", "abc", accounts[0], { from: accounts[3] });
    const response = await cpl.getContractFree.call(accounts[1], 0);
    assert.equal(response[0], "abc", "Contract updated from applicant.");
  });

  it("...should finish the contract", async () => {
    const cpl = await CPL.deployed();
    const cpt = await CPT.deployed();
    await cpl.terminateContract(
      accounts[0],
      accounts[1],
      "abc",
      50,
      cpt.address
    );
    const response = await cpt.balanceOf.call(accounts[1]);
    console.log(response);
    assert.equal(response, 500, "Contract terminated.");
  });
});
