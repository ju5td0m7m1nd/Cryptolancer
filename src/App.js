import React, { Component } from "react";
import styled from "styled-components";
import SimpleStorageContract from "../build/contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

// The word
const Style_01 = styled.button`
    border: 0px;
    outline: none;
    font-family: Raleway;
    font-size: 18px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #6610f2;
    background-color: transparent;
`;

const Style_02 = styled.div`
    width: 246px;
    height: 48px;
    font-family: Raleway;
    font-size: 48px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #707070;
    -webkit-text-stroke: 3px #707070;
`;
const Style_03 = styled.div`
    width: 1540px;
    height: 10px;
    font-family: HelveticaNeue;
    font-size: 22px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.5;
    letter-spacing: normal;
    text-align: center;
    color: #707070;
`;
const Style_04 = styled.div`
    width: 368px;
    height: 48px;
    font-family: Raleway;
    font-size: 48px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #575799;
    -webkit-text-stroke: 3px #575799;
`;
const Floating = styled.div`
    width: 78px;
    height: 140px;
    font-family: Raleway;
    font-size: 120px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #dae6fa;
    -webkit-text-stroke: 10px #dae6fa;
`;

const Style_05 = styled.div`
    width: 720px;
    height: 48px;
    font-family: Raleway;
    font-size: 40px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #eae8e8;
    -webkit-text-stroke: 3px #eae8e8;
`;


const Biography = styled.div`
    width: 400px;
    height: 64px;
    font-family: Raleway;
    font-size: 32px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: #f0f0f2;
`;
const Rectangle_40 = styled.div`
  width: 226px;
  height: 65px;
  border-radius: 40px;
  background-color: #ffffff;
  border: solid 4px #6610f2;
`;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    // getWeb3
    //   .then(results => {
    //     this.setState({
    //       web3: results.web3
    //     });
    //     // Instantiate contract once web3 provided.
    //     this.instantiateContract();
    //   })
    //   .catch(() => {
    //     console.log("Error finding web3.");
    //   });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require("truffle-contract");
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage
        .deployed()
        .then(instance => {
          simpleStorageInstance = instance;

          // Stores a given value, 5 by default.
          return simpleStorageInstance.set(5, { from: accounts[0] });
        })
        .then(result => {
          // Get the value from the contract to prove it worked.
          return simpleStorageInstance.get.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result.
          return this.setState({ storageValue: result.c[0] });
        });
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <div style={{width:'1752px',height:'9678px'}}>
             <script src="./java.js"></script>
                <img style={{left:'6.5%',position:'absolute',top:'70px'}} src={require('../public/images/icons/logo_purple.png')} />
                <Style_01 style={{left:'55.2%', position: 'absolute', top: '60px'}} > HOW IT WORKS </Style_01>
                <Style_01 style={{left:'66%', position: 'absolute', top: '60px'}}> CL TOKEN </Style_01>
                <Style_01 style={{left:'74.86%', position: 'absolute', top: '60px'}}> TEAM </Style_01>
                <Rectangle_40 style={{left:'81.86%', position: 'absolute', top: '38px'}}></Rectangle_40>
                <Style_01 style={{left:'83.6%', position: 'absolute', top: '60px'}}> WHITE PAPER </Style_01>
                <img style={{top:'146.5px',position:'absolute',width:'115%',height:'921.4px',backgroundimage:'linear-gradient(271deg, #0f69e6, #c1dbff)'}} src={require('../public/images/icons/pic/Group126.png')} />
                <img style={{left:'43%',top:'1280px',position:'absolute',width:'89px',height:'89px',opacity:'0.72'}} src={require('../public/images/icons/pic/Arrow.png')} />
                <Style_02 style={{left:'39.6%', position: 'absolute', top: '1188px'}}> SOLUTION</Style_02>
                <Style_03 style={{left:'6.7%', position: 'absolute', top: '1443px'}}> Cryptolancer provides a blockchain-based ecosystem to protect both outsourcing company and freelancer. </Style_03>
                <Style_03 style={{left:'9.7%', position: 'absolute', top: '1513px'}}> We'll lock and secure the project information once the smart contract is signed. The contract will</Style_03>
                <Style_03 style={{left:'9.4%', position: 'absolute', top: '1583px'}}> executed automatically on the delivery date. If there is a dispute between company and freelancer,</Style_03>
                <Style_03 style={{left:'6.3%', position: 'absolute', top: '1653px'}}> jurors on the network will evaluate evidence and cast their vote.</Style_03>
                <Style_03 style={{left:'5.3%', position: 'absolute', top: '1723px'}}> and the decision is enforced by the smart contract.</Style_03>


                <Style_04 style={{left:'37.6%', position: 'absolute', top: '2099px'}}> HOW IT WORKS</Style_04>                            
                <img style={{top:'2380px',position:'absolute',width:'105%',height:'2291.4px',webkitbackdropfilter:'blur(30px)',backdropfilter:'blur(30px)',
  backgroundcolor:'#dbeaff'}} src={require('../public/images/icons/pic/Path113.png')} /> 
                <img style={{left:'22%',position:'absolute',top:'2442px',width:'332px',height:'272px'}} src={require('../public/images/icons/pic/Contract.png')} />               
                <img style={{left:'62.79%',position:'absolute',top:'2944px',width:'342px',height:'272px'}} src={require('../public/images/icons/pic/Security.png')} />
                <img style={{left:'23.3%',position:'absolute',top:'3450px',width:'342px',height:'272px'}} src={require('../public/images/icons/pic/Automation.png')}/>
                <img style={{left:'64.3%',position:'absolute',top:'3920px',width:'342px',height:'272px'}} src={require('../public/images/icons/pic/Arbitration.png')}/>

                
                <img style={{right:'1%',top:'4627.1px',position:'absolute',width:'105%',height:'1677.9px',backgroundimage:'linear-gradient(to left, #195eba, #07244a)'}} src={require('../public/images/icons/pic/Path115.png')} />
                <img style={{left:'10%',top:'4911.1px',position:'absolute',width:'75%',height:'1000.9px'}} src={require('../public/images/icons/pic/Group125.png')} />
                <Style_05 style={{left:'28.8%', position: 'absolute', top: '4706px'}}> Cryptolancer Ecosystem </Style_05>

                <Style_02 style={{left:'39.6%', position: 'absolute', top: '6352px'}}> CL Token</Style_02>
                <img style={{left:'16%',position:'absolute',top:'6584px',width:'1360px',height:'780px'}} src={require('../public/images/icons/pic/Group120.png')} />

                
                <img style={{right:'1%',position:'absolute',top:'7550px',width:'120%',height:'2310px',backgroundimage:'linear-gradient(91deg, #2b80f8, #accefd 38%, #1b76f7)'}} src={require('../public/images/icons/pic/Path124.png')} />
                <Style_05 style={{left:'27%', position: 'absolute', top: '7839px'}}> Team </Style_05>
                <img style={{left:'10%',position:'absolute',top:'8073px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Frank.png')} />
                <Style_05 style={{left:'0%', position: 'absolute', top: '8456px'}}> Frank Tasi </Style_05>
                <Biography style={{left:'9%', position: 'absolute', top: '8550px'}}>FRISMO co-founder & CTO Medium writer </Biography>
                <Biography style={{left:'9%', position: 'absolute', top: '8650px'}}>Computer Science B.S. </Biography>
                <img style={{left:'37%',position:'absolute',top:'8073px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Joann.png')} /> 
                <Style_05 style={{left:'27%', position: 'absolute', top: '8456px'}}> Joann Chang </Style_05>                                                                                             
                <Biography style={{left:'36%', position: 'absolute', top: '8548px'}}>Computer Science M.S. </Biography> 
                <Biography style={{left:'36%', position: 'absolute', top: '8600px'}}>Computer Science B.S. </Biography>
                <Biography style={{left:'36%', position: 'absolute', top: '8650px'}}>Lite-on Corp. Intern </Biography>                                                                                             
                <img style={{left:'64%',position:'absolute',top:'8073px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Jack.png')} /> 
                <Style_05 style={{left:'54.5%', position: 'absolute', top: '8456px'}}> Jack Yu </Style_05>                                                                                             
                <Biography style={{left:'63%', position: 'absolute', top: '8548px'}}>Computer Science M.S. </Biography> 
                <Biography style={{left:'63%', position: 'absolute', top: '8650px'}}>Computer Science B.S </Biography>
                <img style={{left:'10%',position:'absolute',top:'8760px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Sabrina.png')} />
                <Style_05 style={{left:'0%', position: 'absolute', top: '9142px'}}> Sabrina Kuo </Style_05>
                <Biography style={{left:'9%', position: 'absolute', top: '9236px'}}>FRISMO co-founder & CTO Medium writer </Biography>
                <Biography style={{left:'9%', position: 'absolute', top: '9338px'}}>Computer Science B.S. </Biography> 
                <img style={{left:'37%',position:'absolute',top:'8760px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Michael.png')} /> 
                <Style_05 style={{left:'27%', position: 'absolute', top: '9142px'}}> Michael Liu </Style_05>                                                                                             
                <Biography style={{left:'36%', position: 'absolute', top: '9236px'}}>Computer Science M.S. </Biography> 
                <Biography style={{left:'36%', position: 'absolute', top: '9338px'}}>Electrical Engineer and
Computer Science B.S. </Biography>
                <img style={{left:'64%',position:'absolute',top:'8760px',width:'340px',height:'340px'}} src={require('../public/images/icons/pic/Dean.png')} /> 
                <Style_05 style={{left:'54.5%', position: 'absolute', top: '9142px'}}> Dean Lai </Style_05>                                                                                             
                <Biography style={{left:'63%', position: 'absolute', top: '9236px'}}>Computer Science M.S. </Biography>
                <Biography style={{left:'63%', position: 'absolute', top: '9287px'}}>Bio-technology B.S. </Biography>
                <Biography style={{left:'63%', position: 'absolute', top: '9338px'}}>National Center for High-Performance Computing </Biography>


          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
