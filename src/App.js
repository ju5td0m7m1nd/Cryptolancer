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
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const TitleBox= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin-top: 40px;
`;
const LogoBox= styled.div`
  width: 55%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: row;
`;
const FutureBox= styled.div`
  width: 120%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(271deg, #0f69e6, #c1dbff);
`;

const Section_0= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 100px;
  margin-bottom: 100px;
`;
const Future_word= styled.div`
  width: 20%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 200px;
`;
const Section_1= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 40px;
`;
const Context= styled.div`
  width: 90%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 35px;
`;
const Arror= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Section_2= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
  margin-top: 310px;
`;

const StepBox= styled.div`
  width: 120%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left:10%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: #dbeaff;
`;

const SmallPic_Left= styled.div`
  width: 70%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 100px;
`;
const SmallPic_Right= styled.div`
  width: 70%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin-bottom: 100px;
`;
const compensate_color= styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 500px;
`;
const BlueBox= styled.div`
  width: 120%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left:10%;
  background-image: linear-gradient(to left, #195eba, #07244a);
`;

const Section_3= styled.div`
  width: 100%;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;

`;
const Ball= styled.div`
  width: 95%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 90px;
`;
const Section_4= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 110px;
`;
const Pie= styled.div`
  width: 90%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 110px;  
`;

const TeamBox= styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 410px;
  background-image: linear-gradient(91deg, #2b80f8, #accefd 38%, #1b76f7);
`;
const Section_5= styled.div`
  width: 100%;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 110px;
`;
const Person= styled.div`
  width: 100%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Person_Mid= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Person_Left= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Person_Right= styled.div`
  width: 80%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

`;
const BioContext= styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const BioContext_Mid= styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 70px;
  margin-bottom: 50px;
`;
const BioContext_Mid_2= styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 50px;
`;
const Future = styled.div`
    width: 773px;
    height: 135px;
    font-family: Raleway;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
`;

const Style_01 = styled.button`

    margin-right:4%;
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
    margin-bottom: 15px;
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
    text-align: left;
    color: #f0f0f2;
    margin-bottom: 20px;
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
             <Container>
                <TitleBox >
                    <LogoBox>
                       <img src={require('../public/images/icons/logo_purple.png')} />
                    </LogoBox>
                    <Style_01 > HOW IT WORKS </Style_01>
                    <Style_01 > CL TOKEN </Style_01>
                    <Style_01 > TEAM </Style_01>
                    <img style={{width:'200px',height:'55px'}}src={require('../public/images/icons/pic/WhitePageBtn.png')} />
                </TitleBox>                                            
                <FutureBox>                                                                                                                     
                <Section_0>                                                   
                    <Style_05> The future of freelancing </Style_05> 
                </Section_0>
                <Future_word>
                    <Future> Crypolancer ecosystem make it more secure and promising. </Future>                                                
                </Future_word>                                                   
                </FutureBox>
                                                                                                                                                                                                                                                            
                <Section_1 > 
                          <Style_02 > SOLUTION</Style_02> 
                </Section_1>
                <Arror>                                                                                                              
                          <img style={{width:'5.7%',height:'89px',opacity:'0.72'}} src={require('../public/images/icons/pic/Arrow.png')} />
                </Arror> 
                <Context>                                                                            
                          <Style_03 > Cryptolancer provides a blockchain-based ecosystem to protect both outsourcing company and freelancer. </Style_03>
                </Context>
                <Context>                                                                        
                          <Style_03 > We'll lock and secure the project information once the smart contract is signed. The contract will</Style_03>
                </Context>
                <Context>                                                                        
                          <Style_03 > executed automatically on the delivery date. If there is a dispute between company and freelancer,</Style_03>
                </Context> 
                <Context>                                                                        
                          <Style_03 > jurors on the network will evaluate evidence and cast their vote.</Style_03>
                </Context> 
                <Context>                                                                        
                          <Style_03 > and the decision is enforced by the smart contract.</Style_03>                                                                        
                </Context>                                                                                                             
                
                <Section_2 >                                                                      
                <Style_04 > HOW IT WORKS</Style_04>
                </Section_2 >                                                                        
                <StepBox>                                                                        
                <SmallPic_Left>
                          <img  src={require('../public/images/icons/pic/Contract.png')} />
                </SmallPic_Left>
                <SmallPic_Right>                                                           
                <img  src={require('../public/images/icons/pic/Security.png')} />
                </SmallPic_Right>
                <SmallPic_Left>                                                 
                <img  src={require('../public/images/icons/pic/Automation.png')}/>
                </SmallPic_Left>
                <SmallPic_Right>                                                 
                <img  src={require('../public/images/icons/pic/Arbitration.png')}/>
                </SmallPic_Right>                                              
                </StepBox>                                                                                                

                <BlueBox>
                <compensate_color>
                <div>.</div>                                               
                </compensate_color>                                                
                <Section_3>                                              
                    <Style_05 > Cryptolancer Ecosystem </Style_05>
                </Section_3>
                <Ball>
                     <img src={require('../public/images/icons/pic/Group125.png')} />                                              
                </Ball>                                                                                         
                </BlueBox>                                                                    
                
                <Section_4>                                                      
                <Style_02 > CL Token</Style_02>
                </Section_4> 
                <pie>                                                       
                    <img src={require('../public/images/icons/pic/Group120.png')} />
                </pie>                                                                                              
                 

                <TeamBox>
                    <Section_5>
                        <Style_05>  Team </Style_05>
                    </Section_5>
                    <Person>         
                    <Person_Left>
                    <img src={require('../public/images/icons/pic/Frank.png')} />          
                    </Person_Left> 
                    <Person_Mid>          
                    <img src={require('../public/images/icons/pic/Joann.png')} />
                    </Person_Mid>
                    <Person_Right>
                    <img src={require('../public/images/icons/pic/Jack.png')} />                                               
                    </Person_Right> 
                    </Person>

                    <Person>         
                    <Person_Left>
                            <BioContext>          
                            <Style_05 > Frank Tasi </Style_05>
                            <Biography >● FRISMO co-founder & CTO Medium writer </Biography>                                      
                            <Biography >● Computer Science B.S. </Biography>
                            </BioContext>                                                                   
                    </Person_Left>
                    <Person_Mid>
                            <BioContext_Mid>          
                            <Style_05 > Joann Chang </Style_05>
                            <Biography >● Computer Science M.S.  </Biography>                                      
                            <Biography >● Computer Science B.S. </Biography>
                            <Biography >● Lite-on Corp. Intern </Biography>
                            </BioContext_Mid> 
                    </Person_Mid>
                    <Person_Right>
                            <BioContext>          
                            <Style_05 > Jack Yu </Style_05>
                            <Biography >● Computer Science M.S. </Biography>                                      
                            <Biography >● Computer Science B.S. </Biography>
                            </BioContext>                                                                             
                    </Person_Right>                                               
                    </Person>

                    <Person>         
                    <Person_Left>
                    <img src={require('../public/images/icons/pic/Sabrina.png')} />          
                    </Person_Left>
                    <Person_Mid>
                    <img src={require('../public/images/icons/pic/Michael.png')} />
                    </Person_Mid>                                              
                    <Person_Right>
                    <img src={require('../public/images/icons/pic/Dean.png')} />                                               
                    </Person_Right> 
                    </Person>

                    <Person>         
                    <Person_Left>
                            <BioContext>          
                            <Style_05 > Sabrina Kuo </Style_05>
                            <Biography >● Computer Science M.S. </Biography>                                      
                            <Biography >● Computer Science B.S. </Biography>
                            </BioContext>                                                                   
                    </Person_Left>
                    <Person_Mid>
                            <BioContext_Mid_2>          
                            <Style_05 > Michael Liu </Style_05>
                            <Biography >● Computer Science M.S.  </Biography>                                      
                            <Biography >● Electrical Engineer and Computer Science B.S. </Biography>
                            </BioContext_Mid_2>
                    </Person_Mid>
                    <Person_Right>
                            <BioContext>          
                            <Style_05 > Dean Lai </Style_05>
                            <Biography >● Computer Science M.S. </Biography>                                      
                            <Biography >● Bio-technology B.S. </Biography>                   
                            </BioContext>                                                                             
                    </Person_Right>                                               
                    </Person>
                </TeamBox>                                                                                                  
          </Container>
        </Switch>
      </Router>
    );
  }
}

export default App;
