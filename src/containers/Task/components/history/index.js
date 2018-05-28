import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
class History extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Task History</div>;
  }
}

export default withRouter(History);
