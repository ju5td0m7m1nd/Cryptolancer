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
import Ongoing from "./components/ongoing";
import History from "./components/history";
import Detail from "./components/detail";
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

  componentWillReceivesProps(nextState, nextProps) {}
  _route = path => this.props.history.push(path);

  render() {
    const { match } = this.props;
    const { section } = this.props.match.params;

    return (
      <Container>
        <Navbar section={section} color="#f17105" route={this._route} />
        <Switch>
          <Route exact path={`/dashboard/task/browse`} component={Browse} />
          <Route path={`/dashboard/task/create`} component={Create} />
          <Route path={`/dashboard/task/ongoing`} component={Ongoing} />
          <Route path={`/dashboard/task/history`} component={History} />
          <Route path="/dashboard/task/browse/:id" component={Detail} />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(Task);
