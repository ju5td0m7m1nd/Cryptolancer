pragma solidity ^0.4.20;

import "./CPT.sol";
contract CPL {
  modifier onlyBy(address _account) { require(msg.sender==_account); _; }

  mapping(address => ContractBox[]) public Contracts;
  mapping(address => ContractBox[]) public Contracts_free;

  struct ContractBox {
    string name;
    string ipfs;
    uint256 price;
    address contractor;
    address issuer;
    uint state; // 0 : pendding  ; 1 : launch ;  2 : discontinued
  }

  CPT public cpt;
  address public Owner;
  address[] issuers;

  function CPL(){
      Owner = msg.sender;
  }

  function createProject(string _name, string _ipfs, uint256 _priceProject) public {
    // if first init, push to issuers array
    if (Contracts[msg.sender].length == 0) {
      issuers.push(msg.sender);
    }

  	Contracts[msg.sender].push(ContractBox({
      name: _name,
      ipfs: _ipfs,
      price: _priceProject,
      contractor: address(0),
      issuer: msg.sender,
      state: 0
    }));
  }

  function getIssuerWithIndex(uint index) public returns (address issuer) {
    return issuers[index];
  }

  function getAllContractCount() public returns (uint length) {
    return issuers.length;
  }

  function getContractCount(address _personalAddr) public returns(uint length) {
    return Contracts[_personalAddr].length;
  }

  function getContract(address _personalAddr, uint index) public returns (string ipfs, uint state) {
	return (Contracts[_personalAddr][index].ipfs, Contracts[_personalAddr][index].state);
  }

  function getContractFreeCount(address _personalAddr) public returns(uint length) {
	return Contracts_free[_personalAddr].length;
  }

  function getContractFree(address _personalAddr, uint index) public returns(string ipfs, uint state) {
	return (Contracts_free[_personalAddr][index].ipfs, Contracts_free[_personalAddr][index].state);
  }

  function getContractIndexByIssuer(address _owner, string _ipfs) public returns (uint) {
    uint i = 0;
    for(i = 0 ; i < Contracts[_owner].length ; i++) {
        if(stringsEqual(Contracts[_owner][i].ipfs, _ipfs))
            break;
    }

    return(i);
  }

  function getContractIndexByContractor(address _freeLancer, string _ipfs) private returns (uint){
    uint i = 0;
    for(i = 0 ; i < Contracts_free[_freeLancer].length ; i++) {
        if(stringsEqual(Contracts_free[_freeLancer][i].ipfs,  _ipfs))
            break;
    }

    return(i);
  }

  function updateContractFromApplicant(string old_ipfs, string new_ipfs, address _contractOwner)public{
	    require(msg.sender != address(0));
		uint i = getContractIndexByIssuer(_contractOwner , old_ipfs);
		if (Contracts[_contractOwner][i].state == 0) {
			Contracts[_contractOwner][i].ipfs = new_ipfs;
		} else {
			address _freeLancer = Contracts[_contractOwner][i].contractor;
			require(Contracts[_contractOwner][i].state == 1);//launch

			uint j = getContractIndexByContractor(_freeLancer, old_ipfs);
			
			require(Contracts_free[_freeLancer][j].state == 1);
			Contracts[_contractOwner][i].ipfs = new_ipfs;
			Contracts_free[_freeLancer][j].ipfs = new_ipfs;
		}
	  
		
	}
	
	function updateContractFromOwner(string old_ipfs, string new_ipfs )public{
	    require(msg.sender != address(0));
		 uint i = getContractIndexByIssuer(msg.sender , old_ipfs);
		// if contract still not assigned, only update Contracts
		if(Contracts[msg.sender][0].state == 0) {
			Contracts[msg.sender][i].ipfs = new_ipfs;
		} else {
			address _freeLancer = Contracts[msg.sender][i].contractor;
			require(Contracts[msg.sender][i].state == 1);//launch
			uint j = getContractIndexByContractor(_freeLancer, old_ipfs);
			require(Contracts_free[_freeLancer][j].state == 1);
			Contracts[msg.sender][i].ipfs = new_ipfs;
			Contracts_free[_freeLancer][j].ipfs = new_ipfs;
		}
	   
	}

  function updateContractFromFreelancer(string old_ipfs, string new_ipfs)public{
    require(msg.sender != address(0));
    uint i = getContractIndexByContractor(msg.sender, old_ipfs);
	address _issuer = Contracts_free[msg.sender][i].issuer;
    require(Contracts_free[msg.sender][i].state == 1);//launch

	uint j = getContractIndexByIssuer(_issuer, old_ipfs);

	require(Contracts[_issuer][j].state == 1);
	Contracts[_issuer][i].ipfs = new_ipfs;
	Contracts_free[msg.sender][j].ipfs = new_ipfs;
  }

  function assignContract(address _contractor, string _ipfs) public {
    require(msg.sender != address(0));

    uint i = getContractIndexByIssuer(msg.sender, _ipfs);
	//freeLancer = _freeLancer;
    require(Contracts[msg.sender][i].state == 0);//pendding
    require(Contracts[msg.sender][i].contractor == address(0));
    Contracts[msg.sender][i].state = 1;
    Contracts[msg.sender][i].contractor = _contractor ;
    // freelancer information
    Contracts_free[_contractor].push(ContractBox({
      name: Contracts[msg.sender][i].name,
      ipfs: Contracts[msg.sender][i].ipfs,
      price: Contracts[msg.sender][i].price,
      contractor: Contracts[msg.sender][i].contractor,
      issuer: Contracts[msg.sender][i].issuer,
      state: Contracts[msg.sender][i].state
    }));
  }

  function terminateContract(address _contractOwner, address _freeLancer, string _ipfs, uint256 percent, address tokenAddress, string _newIpfs) public payable {

    // Update latest ipfs 

    uint contractIdByContractOwner = getContractIndexByIssuer(_contractOwner, _ipfs);
    uint contractIdByFreelancer = getContractIndexByContractor(_contractOwner, _ipfs);
  	require(_freeLancer == Contracts[_contractOwner][contractIdByContractOwner].contractor);
    require(Contracts[_contractOwner][contractIdByContractOwner].state == 1);//launch

  	uint256 price = Contracts[_contractOwner][contractIdByContractOwner].price;

  	CPT coinContract = CPT(tokenAddress);
    coinContract.transferFrom(_contractOwner, _freeLancer, (price * percent / 100));
    Contracts[_contractOwner][contractIdByContractOwner].ipfs = _newIpfs; //terminate
	  Contracts_free[_freeLancer][contractIdByFreelancer].ipfs = _newIpfs ;
    Contracts[_contractOwner][contractIdByContractOwner].state = 2; //terminate
	  Contracts_free[_freeLancer][contractIdByFreelancer].state = 2 ;
  }

  function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
	bytes storage a = bytes(_a);
	bytes memory b = bytes(_b);
	if (a.length != b.length)
		return false;
	// @todo unroll this loop
	for (uint i = 0; i < a.length; i ++)
		if (a[i] != b[i])
			return false;

    return true;
  }

  /* Generates a random number in the range (left, right] based on the last block hash */
  function randomGen(uint left, uint right, uint seed) constant returns (uint) {
    require(left <= right);
    uint random;
    uint range = right - left;

    random = uint(keccak256(block.blockhash(block.number-1), seed)) % range + left;

    return random;
  }

  function winnerReward(address[] jurors, uint[] correctCount, uint[] jurorToken, CPT tokenAddress) public {
    uint total_weight = 0;
    uint total_token = 0;
    uint[] weights;
    CPT coinContract = CPT(tokenAddress);

    for (uint i = 0; i < jurors.length; i++){
        total_token += jurorToken[i];
        weights.push(correctCount[i] * jurorToken[i]);
        total_weight += weights[i];
        require(coinContract.transferFrom(jurors[i], this, jurorToken[i]));
    }

    for (i = 0; i < jurors.length; i++){
        require(coinContract.transferFrom(this, jurors[i], total_token*weights[i]/total_weight));
    }
  }
}
