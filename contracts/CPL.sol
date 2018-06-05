pragma solidity ^0.4.20;
//import "browser/CPT.sol";
import "./CPT.sol";
contract CPL {
   
  /* *** Modifiers *** */
  //modifier onlyOwner{ require(contractOwner == msg.sender); _; }
  
  mapping(address => ContractBox[]) public Contracts;
  mapping(address => ContractBox[]) public Contracts_free;
  address[] issuers; 
  struct ContractBox {
    string name;
    string ipfs;
    uint256 price;
    address contractor;
    address issuer;
    uint state; // 0 : pendding  ; 1 : launch ;  2 : discontinued
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
	function getContract(address _personalAddr, uint index) public returns (string ipfs) {
		return Contracts[_personalAddr][index].ipfs;
	}
	function getContractFreeCount(address _personalAddr) public returns(uint length) {
		return Contracts_free[_personalAddr].length;
	}
	function getContractFree(address _personalAddr, uint index) public returns(string ipfs) {
		return Contracts_free[_personalAddr][index].ipfs;
	}

	
	function getProjectContractOwner(address _owner, string _ipfs) private returns (uint) {
	    uint i = 0 ;
	    for(i = 0 ; i < Contracts[_owner].length ; i++) {
	        if(stringsEqual(Contracts[_owner][i].ipfs, _ipfs))
	            break;
	    }
	    return(i);
	}
	
	function getProjectFree(address _freeLancer, string _ipfs) private returns (uint){
	    uint i = 0 ;
	    for(i = 0 ; i < Contracts_free[_freeLancer].length ; i++)
	    {
	        if(stringsEqual(Contracts_free[_freeLancer][i].ipfs,  _ipfs))
	            break;
	    }
	    return(i);
	}
  function updateContractFromApplicant(string old_ipfs, string new_ipfs, address _contractOwner)public{
	    require(msg.sender != address(0));
	    uint i = getProjectContractOwner(_contractOwner , old_ipfs);
		address _freeLancer = Contracts[_contractOwner][i].contractor;
	    require(Contracts[_contractOwner][i].state == 1);//launch

		uint j = getProjectFree(_freeLancer, old_ipfs);
		
		require(Contracts_free[_freeLancer][j].state == 1);
		Contracts[_contractOwner][i].ipfs = new_ipfs;
		Contracts_free[_freeLancer][j].ipfs = new_ipfs;
	}
	
	function updateContractFromOwner(string old_ipfs, string new_ipfs)public{
	    require(msg.sender != address(0));
	    uint i = getProjectContractOwner(msg.sender , old_ipfs);
		address _freeLancer = Contracts[msg.sender][i].contractor;
	    require(Contracts[msg.sender][i].state == 1);//launch

		uint j = getProjectFree(_freeLancer, old_ipfs);
		
		require(Contracts_free[_freeLancer][j].state == 1);
		Contracts[msg.sender][i].ipfs = new_ipfs;
		Contracts_free[_freeLancer][j].ipfs = new_ipfs;
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
  function updateContractFromFreelancer(string old_ipfs, string new_ipfs)public{
	    require(msg.sender != address(0));
	    uint i = getProjectFree(msg.sender, old_ipfs);
		address _issuer = Contracts_free[msg.sender][i].issuer;
	    require(Contracts[msg.sender][i].state == 1);//launch

		uint j = getProjectContractOwner(_issuer, old_ipfs);

		require(Contracts[_issuer][j].state == 1);
		Contracts[_issuer][i].ipfs = new_ipfs;
		Contracts_free[msg.sender][j].ipfs = new_ipfs;
	}

  function assignContract(address _contractor, string _ipfs) public {
	    require(msg.sender != address(0));
	   
	    uint i = getProjectContractOwner(msg.sender, _ipfs);
		//freeLancer = _freeLancer;
	    require(Contracts[msg.sender][i].state == 0);//pendding
	    require(Contracts[msg.sender][i].contractor == address(0));
	    Contracts[msg.sender][i].state = 1;
	    Contracts[msg.sender][i].contractor = _contractor ;
	    // freelancer information
	    Contracts_free[_contractor].push(Contracts[_contractor][i]);
  }
	
	function receiveContract(address _contractOwner, string _ipfs)public{
	    require(msg.sender != address(0));
	   
	    uint i = getProjectContractOwner(_contractOwner, _ipfs);
		//freeLancer = _freeLancer;
	    require(Contracts[_contractOwner][i].state == 0);//pendding
	    require(Contracts[_contractOwner][i].contractor == address(0));
	    Contracts[_contractOwner][i].state = 1;
	    Contracts[_contractOwner][i].contractor = msg.sender ;
	    // freelancer information
	    Contracts_free[msg.sender].push(Contracts[_contractOwner][i]);
	}

    
	function terminateContract(address _contractOwner, address _freeLancer, string _ipfs  , uint256 percent, address tokenAddress) public payable{
	    uint contractIdByContractOwner = getProjectContractOwner(_contractOwner, _ipfs);
		require(_freeLancer == Contracts[_contractOwner][contractIdByContractOwner].contractor);
	    require(Contracts[_contractOwner][contractIdByContractOwner].state == 1);//launch

		CPT coinContract = CPT(tokenAddress);
		uint256 price = Contracts[_contractOwner][contractIdByContractOwner].price;
	    coinContract.transferFrom(_contractOwner, _freeLancer, (price * (percent / 100)));
	    Contracts[_contractOwner][contractIdByContractOwner].state = 2; //terminate
		uint contractIdByFreelancer = getProjectFree(_contractOwner, _ipfs);
		Contracts_free[_freeLancer][contractIdByFreelancer].state = 2 ;
	}
}

