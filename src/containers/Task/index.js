import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Create from "./components/create";
import Browse from "./components/browse";
import Ongoing from "./components/ongoing";
import History from "./components/history";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path="/" component={Browse} />
            <Route path="create" component={Create} />
            <Route path="/ongoing" component={Ongoing} />
            <Route path="/history" component={History} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default Task;
