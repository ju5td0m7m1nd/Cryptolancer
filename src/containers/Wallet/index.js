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
  render() {
    return <Container>Wallet</Container>;
  }
}

export default Wallet;
