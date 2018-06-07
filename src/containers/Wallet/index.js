import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

class Wallet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // get transfer event
    /*

    let transferEvent = product.Transferred({}, {fromBlock: 0, toBlock: 'latest'})
transferEvent.get((error, logs) => {
  // we have the logs, now print them
  logs.forEach(log => console.log(log.args))
})
  */
  }

  render() {
    return <Container>Wallet</Container>;
  }
}

export default Wallet;
