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
import Dispute from "./components/dispute";
import NavBar from "./components/NavBar";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class Court extends React.Component {
  constructor(props) {
    super(props);
  }
  _route = path => this.props.history.push(path);
  render() {
    const { section } = this.props.match.params;
    return (
      <Container>
        <NavBar section={section} color="#D11149" route={this._route} />
        <Switch>
          <Route exact path={`/dashboard/court/browse`} component={Browse} />
          <Route path="/dashborad/court/record" component={Record} />
          <Route path={`/dashboard/court/browse/:ipfs`} component={Dispute} />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(Court);
