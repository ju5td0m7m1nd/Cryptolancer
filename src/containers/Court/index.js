import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Browse from "./components/browse";
import Ongoing from "./components/ongoing";
import History from "./components/history";
import Dispute from "./components/dispute";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class Court extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path={`/dashboard/court/dispute`} component={Dispute} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default Court;
