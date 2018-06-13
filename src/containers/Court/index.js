import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Browse from "./components/browse";
import Record from "./components/history";
import MyJudge from "./components/myJudge";
import Dispute from "./components/dispute";
import NavBar from "./components/NavBar";
import { CPLInstance, CPTInstance } from "../../utils/getContract";
import getWeb3 from "../../utils/getWeb3";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class Court extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CPL: null,
      web3: null,
      CPT: null
    };
  }
  async componentDidMount() {
    const CPL = await CPLInstance();
    const CPT = await CPTInstance();
    const web3 = (await getWeb3).web3;
    this.setState({ CPL, web3, CPT });
  }

  _route = path => this.props.history.push(path);
  render() {
    const { section } = this.props.match.params;
    const { CPL, web3, CPT } = this.state;
    return (
      <Container>
        <NavBar section={section} color="#D11149" route={this._route} />
        <Switch>
          <Route
            exact
            path={`/dashboard/court/browse`}
            component={() => <Browse CPL={CPL} web3={web3} />}
          />
          <Route
            exact
            path="/dashboard/court/record"
            component={() => <Record CPL={CPL} web3={web3} CPT={CPT} />}
          />
          <Route
            path={`/dashboard/court/record/:ipfs`}
            component={props =>
              <MyJudge CPL={CPL} web3={web3} CPT={CPT} {...props} />}
          />
          <Route
            path={`/dashboard/court/browse/:ipfs`}
            component={props =>
              <Dispute CPL={CPL} web3={web3} CPT={CPT} {...props} />}
          />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(Court);
