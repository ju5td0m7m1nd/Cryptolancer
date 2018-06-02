pragma solidity ^0.4.20;
//import "browser/CPT.sol";
import "./CPT.sol"
contract CPL {
   
  /* *** General *** */
  address public contractOwner;       // The one setting up the contract
  address public freeLancer; // The address which will get the funds.
  TokenERC20 public token;  
  uint public tokensForSale;
  
  /* *** Modifiers *** */
  modifier onlyOwner{ require(contractOwner == msg.sender); _; }
  
  mapping(address => ContractBox[]) public Contracts;
  mapping(address => ContractBox[]) public Contracts_free;
  
  struct ContractBox {
    bytes32 name;
    bytes32 ipfs;
	uint price;
	address contractor;
	uint state; // 0 : pendding  ; 1 : launch ;  2 : discontinued
	uint datanumber;
  }

  constructor() public {
    require(contractOwner == address(0));
    contractOwner = msg.sender;
  }

	function createProject(bytes32 _name , bytes32 _ipfs, uint _priceProject) public {
	  require(msg.sender == contractOwner);
	  //require(tokensForSale == _priceProject);
      Contracts[msg.sender].push(ContractBox({
          name: _name,
          ipfs: _ipfs,
          price: _priceProject,
          contractor: address(0),
          state: 0,
		  datanumber : 0
      }));
	}

  event search(bytes32 names, bytes32 ipfss);
  event search_free(bytes32 names, bytes32 ipfss);
  
  function searchContract(address _person) public {
	
     for(uint i = 0 ; i < Contracts[_person].length; i++){
        emit search(Contracts[_person][i].name,Contracts[_person][i].ipfs);
	   }
	}
	
	function searchContract_free(address _person) public {

     for(uint i = 0 ; i < Contracts_free[_person].length; i++){
       emit search_free(Contracts_free[_person][i].name,Contracts_free[_person][i].ipfs);
	   }
	
	}
	
	function get_project_contractowner(bytes32 _ipfs) private returns (uint){
	    uint i = 0 ;
	    for(i = 0 ; i < Contracts[contractOwner].length ; i++)
	    {
	        if(Contracts[contractOwner][i].ipfs == _ipfs)
	            break;
	    }
	    return(i);
	}
	
	function get_project_free(bytes32 _ipfs) private returns (uint){
	    uint i = 0 ;
	    for(i = 0 ; i < Contracts_free[freeLancer].length ; i++)
	    {
	        if(Contracts_free[freeLancer][i].ipfs == _ipfs)
	            break;
	    }
	    return(i);
	}
	
	// if you want to update contract, you should set toke first
	function updateContract(bytes32 old_ipfs, bytes32 new_ipfs)public{
	    require(contractOwner == msg.sender);
	    uint i = get_project_contractowner(old_ipfs);
	    require(Contracts[contractOwner][i].state == 1);//launch
		uint j = Contracts[contractOwner][i].datanumber;
		require(Contracts_free[freeLancer][j].state == 1);
		Contracts[contractOwner][i].ipfs = new_ipfs;
		Contracts_free[freeLancer][j].ipfs = new_ipfs;
		
	    
	}
	
	function receiveContract(bytes32 _ipfs , address _freeLancer)public{
	    require(freeLancer == address(0));
	    require(contractOwner == msg.sender);
	    uint i = get_project_contractowner(_ipfs);
		freeLancer = _freeLancer;
	    require(Contracts[contractOwner][i].state == 0);//pendding
	    require(Contracts[contractOwner][i].contractor == address(0));
	    Contracts[contractOwner][i].state = 1;
	    Contracts[contractOwner][i].contractor = freeLancer ;
	    // freelancer information
	    Contracts_free[freeLancer].push(ContractBox({
          name: Contracts[contractOwner][i].name,
          ipfs: Contracts[contractOwner][i].ipfs,
          price: Contracts[contractOwner][i].price,
          contractor: contractOwner,
          state: 1,
		  datanumber : 0
      }));
	    uint j = get_project_free(_ipfs);
	    Contracts[contractOwner][i].datanumber = j ;
	    
	}
	
	function setToken(TokenERC20 _token) public onlyOwner {
        require(address(token) == address(0)); // Make sure the token is not already set.

        token = _token;
        tokensForSale = token.balanceOf(contractOwner);
    }
    
	function terminateContract(bytes32 _ipfs , address _freeLancer , uint percent) public payable{
	    require(freeLancer == _freeLancer);
	    require(contractOwner == msg.sender);
	    uint i = get_project_contractowner(_ipfs);
	    require(Contracts[contractOwner][i].state == 1);//launch
	    token.transferFrom(contractOwner, _freeLancer, (tokensForSale * percent / 100));
	    Contracts[contractOwner][i].state == 2; //terminate
		uint j = Contracts[contractOwner][i].datanumber;
		Contracts_free[freeLancer][j].state = 2 ;
	}
}
