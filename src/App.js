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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 200px;
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
  width: 30%;
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
`;

const StepBox= styled.div`
  width: 100%;
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
  width: 75%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 100px;
`;
const SmallPic_Right= styled.div`
  width: 75%;
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
  width: 100%;
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
  width: 90%;
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
  width: 85%;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-right;
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
  width: 30%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Person_Left= styled.div`
  width: 30%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Person_Right= styled.div`
  width: 30%;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const BioContext_Left= styled.div`
  display: flex;
  align-items: flow-end;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

const BioContext_Right= styled.div`
 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

const BioContext_Mid= styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 5px;
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

const Meau = styled.button`

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

const Title_Grayword = styled.div`
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
const Context_Word = styled.div`
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
const Title_Blueword = styled.div`
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

const Title_Whiteword = styled.div`
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

const Bio_name = styled.div`
    width: 720px;
    height: 48;
    font-family: Raleway;
    font-size: 30px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #eae8e8;
    -webkit-text-stroke: 3px #eae8e8;
    margin-bottom: 10px;
`;
const Bio_context = styled.div`
    width: 400px;
    height: 54;
    font-family: Raleway;
    font-size: 22px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align:center;
    color: #f0f0f2;
    margin-bottom: 10px;
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
                    <Meau > HOW IT WORKS </Meau>
                    <Meau > CL TOKEN </Meau>
                    <Meau > TEAM </Meau>
                    <img style={{width:'200px',height:'55px'}}src={require('../public/images/icons/pic/WhitePageBtn.png')} />
                </TitleBox>                                            
                <FutureBox style={{position: 'relative'}}>
                      <img style={{left:'1%',position: 'absolute',top:'0',zIndex:'-1'}} src={require('../public/images/icons/pic/blue_ground.png')} />                                             
                <Section_0>                                                   
                    <Title_Whiteword> The future of freelancing </Title_Whiteword> 
                </Section_0>
                <Future_word>
                    <Future> Crypolancer ecosystem make it more secure and promising. </Future>                                                
                </Future_word>                                                   
                </FutureBox>
                                                                                                                                                                                                                                                            
                <Section_1 > 
                          <Title_Grayword > SOLUTION</Title_Grayword> 
                </Section_1>
                <Arror>                                                                                                              
                          <img src={require('../public/images/icons/pic/Arrow.png')} />
                </Arror> 
                <Context>                                                                            
                          <Context_Word > Cryptolancer provides a blockchain-based ecosystem to protect both outsourcing company and freelancer. </Context_Word>
                </Context>
                <Context>                                                                        
                          <Context_Word > We'll lock and secure the project information once the smart contract is signed. The contract will</Context_Word>
                </Context>
                <Context>                                                                        
                          <Context_Word > executed automatically on the delivery date. If there is a dispute between company and freelancer,</Context_Word>
                </Context> 
                <Context>                                                                        
                          <Context_Word > jurors on the network will evaluate evidence and cast their vote.</Context_Word>
                </Context> 
                <Context>                                                                        
                          <Context_Word > and the decision is enforced by the smart contract.</Context_Word>                                                                        
                </Context>                                                                                                             
                
                <Section_2 >
                              
                <Title_Blueword > HOW IT WORKS</Title_Blueword>
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
                    <Title_Whiteword > Cryptolancer Ecosystem </Title_Whiteword>
                </Section_3>
                <Ball>
                     <img src={require('../public/images/icons/pic/Group125.png')} />                                              
                </Ball>                                                                                         
                </BlueBox>                                                                    
                
                <Section_4>                                                      
                <Title_Grayword > CL Token</Title_Grayword>
                </Section_4> 
                <pie>                                                       
                    <img src={require('../public/images/icons/pic/Group120.png')} />
                </pie>                                                                                              
                 

                <TeamBox>
                    <Section_5>
                        <Title_Whiteword>  Team </Title_Whiteword>
                    </Section_5>
                    <Person>         
                    <Person_Left>
                    <img src={require('../public/images/icons/pic/Frank.png')} />
                    <Bio_name > Frank Tasi </Bio_name>                        
                    <Bio_context >● FRISMO co-founder & CTO Medium writer </Bio_context>                             
                    <Bio_context >● Computer Science B.S. </Bio_context>
                    </Person_Left> 
                    <Person_Mid>          
                    <img src={require('../public/images/icons/pic/Joann.png')} />
                    <Bio_name > Joann Chang </Bio_name>                            
                    <Bio_context >● Computer Science M.S.  </Bio_context>                              
                    <Bio_context >● Computer Science B.S. </Bio_context>                            
                    <Bio_context >● Lite-on Corp. Intern </Bio_context>
                    </Person_Mid>
                    <Person_Right>
                    <img src={require('../public/images/icons/pic/Jack.png')} />
                    <Bio_name > Jack Yu </Bio_name>                            
                    <Bio_context >● Computer Science M.S. </Bio_context>                             
                    <Bio_context >● Computer Science B.S. </Bio_context>
                    </Person_Right> 
                    </Person>

           

                    <Person>         
                    <Person_Left>
                    <img src={require('../public/images/icons/pic/Sabrina.png')} /> 
                    <Bio_name > Sabrina Kuo </Bio_name>
                    <Bio_context >● Computer Science M.S. </Bio_context>                                      
                    <Bio_context >● Computer Science B.S. </Bio_context>
                    </Person_Left>
                    <Person_Mid>
                    <img src={require('../public/images/icons/pic/Michael.png')} />
                    <Bio_name > Michael Liu </Bio_name>
                    <Bio_context >● Computer Science M.S.  </Bio_context>                                      
                    <Bio_context >● Electrical Engineer and Computer Science B.S. </Bio_context>          
                    </Person_Mid>                                              
                    <Person_Right>
                    <img src={require('../public/images/icons/pic/Dean.png')} />
                    <Bio_name > Dean Lai </Bio_name>
                    <Bio_context >● Computer Science M.S. </Bio_context>                                      
                    <Bio_context >● Bio-technology B.S. </Bio_context>
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
