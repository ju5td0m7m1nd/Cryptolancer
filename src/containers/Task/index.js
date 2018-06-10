import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Create from "./components/create";
import Browse from "./components/browse";
import Issued from "./components/issued";
import Contracted from "./components/contracted";
import Detail from "./components/detail";
import Navbar from "./components/Navbar";
import { CPLInstance } from "../../utils/getContract";
import getWeb3 from "../../utils/getWeb3";
import ipfs from "../../utils/ipfs";

const Container = styled.div`
  width: 90%;
  height: 100%;
  background-color: tranparent;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CPL: null,
      web3: null
    };
  }

  async componentDidMount() {
    const CPL = await CPLInstance();
    const web3 = (await getWeb3).web3;
    this.setState({ CPL, web3 });
  }

  _route = path => this.props.history.push(path);

  render() {
    const { match } = this.props;
    const { section } = this.props.match.params;
    const { pathname } = this.props.location;
    const { CPL, web3 } = this.state;
    const hideNavBar = pathname.indexOf("create") > -1;

    return (
      <Container>
        {hideNavBar
          ? null
          : <Navbar section={section} color="#f17105" route={this._route} />}

        <Switch>
          <Route
            exact
            path={`/dashboard/task/browse`}
            component={props => <Browse {...props} CPL={CPL} web3={web3} />}
          />
          <Route
            path={`/dashboard/task/create`}
            component={() => <Create CPL={CPL} web3={web3} />}
          />
          <Route
            path={`/dashboard/task/issued`}
            component={() => <Issued CPL={CPL} web3={web3} />}
          />
          <Route
            path={`/dashboard/task/contracted`}
            component={() => <Contracted CPL={CPL} web3={web3} />}
          />
          <Route
            path="/dashboard/task/browse/:ipfs"
            component={() => <Detail CPL={CPL} web3={web3} />}
          />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(Task);
