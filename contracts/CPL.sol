pragma solidity ^0.4.20;
//import "browser/CPT.sol";
import "./CPT.sol"
contract CPL {
   
  /* *** General *** */
  address public contractOwner;       // The one setting up the contract
  address public beneficiary; // The address which will get the funds.
  TokenERC20 public token;  
  uint public tokensForSale;
  
  /* *** Modifiers *** */
  modifier onlyOwner{ require(contractOwner == msg.sender); _; }
  
  mapping(address => ContractBox[]) public Contracts;

  struct ContractBox {
    bytes32 name;
    bytes32 ipfs;
	uint price;
	address beneficiary;
	uint state; // 0 : pendding  ; 1 : launch ;  2 : discontinued
  }

  constructor() public {
    require(contractOwner == address(0));
    contractOwner = msg.sender;
  }

	function createProject(bytes32 _name , bytes32 _ipfs, uint _priceProject) public {
	  require(msg.sender == contractOwner);
	  require(tokensForSale == _priceProject);
      Contracts[msg.sender].push(ContractBox({
          name: _name,
          ipfs: _ipfs,
          price: _priceProject,
          beneficiary: address(0),
          state: 0
      }));
	}

  event search(address _person, bytes32[] names, bytes32[] ipfss);

  function searchContract(address _person) public {
     bytes32[] memory names;
     bytes32[] memory ipfss;

     for(uint i = 0 ; i < Contracts[_person].length; i++){
       names[i] = Contracts[_person][i].name;
       ipfss[i] = Contracts[_person][i].ipfs;
	   }

     emit search(_person, names, ipfss);
	}
	
	function get_pro(bytes32 pro_name) private returns (uint){
	    uint i = 0 ;
	    for(i = 0 ; i < Contracts[contractOwner].length ; i++)
	    {
	        if(Contracts[contractOwner][i].name == pro_name)
	            break;
	    }
	    return(i);
	}
	function updateContract(bytes32 _name , address _beneficiary)public{
	    require(beneficiary == _beneficiary);
	    require(contractOwner == msg.sender);
	    uint i = get_pro(_name);
	    require(Contracts[contractOwner][i].state == 0);//pendding
	    require(Contracts[contractOwner][i].beneficiary == address(0));
	    Contracts[contractOwner][i].state = 1;
	    Contracts[contractOwner][i].beneficiary = _beneficiary ;
	    
	}
	
	function setToken(TokenERC20 _token) public onlyOwner {
        require(address(token) == address(0)); // Make sure the token is not already set.

        token = _token;
        tokensForSale = token.balanceOf(this);
    }
    
	function terminate_contract(bytes32 _name , address _beneficiary , uint percent) public payable{
	    require(beneficiary == _beneficiary);
	    require(contractOwner == msg.sender);
	    uint i = get_pro(_name);
	    require(Contracts[contractOwner][i].state == 1);//launch
	    token.transferFrom(contractOwner, _beneficiary, (tokensForSale * percent / 100));
	    Contracts[contractOwner][i].state == 2; //terminate
	}
}
