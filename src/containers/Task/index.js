import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Create from "./components/create";
import Browse from "./components/browse";
import Ongoing from "./components/ongoing";
import History from "./components/history";
import Navbar from "./components/Navbar";

const Container = styled.div`
  width: 60%;
  height: 100%;
  background-color: tranparent;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  _route = path => (window.location.href = path);

  render() {
    const { match } = this.props;
    const { section } = this.props.match.params;

    return (
      <Container>
        <Navbar section={section} color="#f17105" route={this._route} />
        <Router>
          <Switch>
            <Route path={`/dashboard/task/browse`} component={Browse} />
            <Route path={`/dashboard/task/create`} component={Create} />
            <Route path={`/dashboard/task/ongoing`} component={Ongoing} />
            <Route path={`/dashboard/task/history`} component={History} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default Task;
