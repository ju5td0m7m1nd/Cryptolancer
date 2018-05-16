import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  width: 100%;
  height: 15%;
  padding: 8px 24px;
  background-color: #4894fc;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  h1 {
    padding: 0px;
    margin: 0px;
    color: #fff;
  }
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <h1>Cryptolancer</h1>
      </Container>
    );
  }
}

export default Nav;
