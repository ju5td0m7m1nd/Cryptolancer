import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Navbar from "./components/Nav";
import { CPLInstance } from "../../utils/getContract";
import { CPTInstance } from "../../utils/getContract";
import getWeb3 from "../../utils/getWeb3";
import ipfs from "../../utils/ipfs";

const Container = styled.div`
  width: 90%;
  height: 100%;
  background-color: tranparent;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 80%;
  position: relative;
  margin-bottom: 5%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  background-color: tranparent;
  flex-direction: row;
  margin-top: 1%;
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  background-color: #FFF;
  border: solid 1px #707070;
  flex-direction: column;
  margin-bottom: 5%;
  padding: 2%;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  flex-direction: row;
`;

const Head = styled.h3`
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-top: 3%;
  margin-bottom: 1%;
`;

const Body = styled.h3`
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #707070;
  text-align: left;

`;

const Price = styled.div`
  font-size: 80px;
  color: #707070;
  border: 0px;
  background-color: transparent;
  margin-left: 1%;
  margin-top: 5%;
  font-family: Helvetica;
`;

const Green = styled.h3`
  font-size: 30px;
  color: #23702f;
  background-color: transparent;
  font-family: Raleway;
`;

const Pink = styled.h3`
  font-size: 30px;
  color: #ef2d56;
  background-color: transparent;
  font-family: Raleway;
`;

const Address = styled.h3`
  font-size: 18px;
  color: #4894fc;
  background-color: transparent;
  font-family: Raleway;
`;


const Clt = styled.div`
  font-size: 30px;
  color: #909090;
  width: 50%;
  border: 0px;
  background-color: transparent;
  margin-left: 3%;
  margin-top: 5%;
  font-family: Raleway;
`;


class Wallet extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      token: "",
      flow:[],
      CPT: null,
      web3: null
   };
  }


  async componentDidMount() {
    
    const CPT = await CPTInstance();
    const web3 = (await getWeb3).web3;

    this.setState({ CPT, web3 });
    (async () => {
      const response = await CPT.balanceOf(web3.eth.accounts[0])
      console.log(response['c']);
      this.setState({token: response['c']});
    })()

    // get transfer event  
    let transferEvent = CPT.Transfer({}, {fromBlock: 0, toBlock: 'latest'})
    transferEvent.get((error, logs) => {
      // we have the logs, now print them
      const flow=[];
      //logs.forEach(log => console.log(log.args['_from'], log.args['_to'],log.args['_value']['c']))
      logs.forEach(log => {flow.push(log.args) ;})

      this.setState({flow});
      console.log(this.state.flow);
    })
  
  }

  _route = path => this.props.history.push(path);

  render() {
    const { match } = this.props;
    const { section } = this.props.match.params;
    const { pathname } = this.props.location;
    const { CPT ,web3, flow } = this.state;
    return(
      <Container>  
        <Header>
          <font color='#707070'>$ </font>
          <Price> {this.state.token} </Price>
          <Clt>CLT</Clt>
        </Header>
        <Navbar section={section} color="#6610f2" route={this._route} />

        <Wrapper>
          { flow.map((item,key) =>
              <Block>
              {item['_to']===web3.eth.accounts[0] ?
                <Green>+{item['_value']['c']}</Green>
                :<Pink>-{item['_value']['c']}</Pink>
              }
                <Head>Transaction</Head>
                <Center>
                  <Body>from &nbsp;</Body>
                  <Address>{item['_from']}</Address>
                  <Body>&nbsp; to &nbsp;</Body>
                  <Address>{item['_to']}</Address>
                </Center>
              </Block>
          )} 
        </Wrapper>

      </Container>
    );
  }
}

export default Wallet;
