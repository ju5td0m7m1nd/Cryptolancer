var CPL = artifacts.require("./CPL.sol");
var CPT = artifacts.require("./CPT.sol");

contract("CPL", function(accounts) {
  let creator = accounts[0]
  let jurorA = accounts[1]
  let jurorB = accounts[2]
  let jurorC = accounts[3]
  let winner = accounts[4]
  let loser = accounts[5]

  // it("...should create project.", async () => {
  //   const cpl = await CPL.deployed();
  //   cpl.createProject("Frismo", "abc", 1000, { from: accounts[0] });
  //   const response = await cpl.getContract.call(accounts[0], 0);
  //   assert.equal(response[0], "abc", "Contract created.");
  // });
  // it("...should assign contracter", async () => {
  //   const cpl = await CPL.deployed();
  //   await cpl.assignContract(accounts[1], "abc", { from: accounts[0] });
  //   const response = await cpl.getContractFree.call(accounts[1], 0);
  //   assert.equal(response[0], "abc", "Contract assigned.");
  // });
  //
  // it("...should update the contract from owner", async () => {
  //   const cpl = await CPL.deployed();
  //   await cpl.updateContractFromOwner("abc", "def", { from: accounts[0] });
  //   const response = await cpl.getContract.call(accounts[0], 0);
  //   assert.equal(response[0], "def", "Contract updated from owner.");
  // });
  //
  // it("...should update the contract from contractor", async () => {
  //   const cpl = await CPL.deployed();
  //   await cpl.updateContractFromFreelancer("def", "ghi", { from: accounts[1] });
  //   const response = await cpl.getContractFree.call(accounts[1], 0);
  //   assert.equal(response[0], "ghi", "Contract updated from contractor.");
  // });
  //
  // it("...should update the contract from applicant", async () => {
  //   const cpl = await CPL.deployed();
  //   await cpl.updateContractFromApplicant("ghi", "abc", accounts[0], { from: accounts[3] });
  //   const response = await cpl.getContractFree.call(accounts[1], 0);
  //   assert.equal(response[0], "abc", "Contract updated from applicant.");
  // });
  //
  // it("...should finish the contract", async () => {
  //   const cpl = await CPL.deployed();
  //   const cpt = await CPT.deployed();
  //   await cpl.terminateContract(
  //     accounts[0],
  //     accounts[1],
  //     "abc",
  //     50,
  //     cpt.address
  //   );
  //   const response = await cpt.balanceOf.call(accounts[1]);
  //   console.log(response.toNumber());
  //   assert.equal(response, 500, "Contract terminated.");
  // });
  //
  // it("...should get a random number", async () => {
  //     let cpl = await CPL.deployed();
  //
  //     const rn = await cpl.randomGen(0, 1000, 1234, {from: creator});
  //     console.log("Random Number: ", rn.toNumber());
  // });

  it("...should test winnerReward function", async () => {
      let cpt = await CPT.deployed();
      let cpl = await CPL.deployed();

      let jurors = [jurorA, jurorB, jurorC];
      let correctCount = [1, 2, 3];
      let jurorToken = [300, 200, 100];
      // fee: 300
      // A: -300 + 3/10 * (600+100)  =  -120
      // B: -200 + 4/10 * 600  =  +40
      // C: -100 + 3/10 * 600  =  +80

      await cpt.transfer(jurorA, 1000, {from: creator});
      await cpt.transfer(jurorB, 1000, {from: creator});
      await cpt.transfer(jurorC, 1000, {from: creator});
      await cpt.transfer(winner, 10000, {from: creator});
      await cpt.transfer(loser, 10000, {from: creator});

      await cpl.winnerReward(jurors, correctCount, jurorToken, cpt.address, loser, 3000);

      const responseA = await cpt.balanceOf.call(jurorA);
      console.log(responseA.toNumber());
      const responseB = await cpt.balanceOf.call(jurorB);
      console.log(responseB.toNumber());
      const responseC = await cpt.balanceOf.call(jurorC);
      console.log(responseC.toNumber());

  });
});
