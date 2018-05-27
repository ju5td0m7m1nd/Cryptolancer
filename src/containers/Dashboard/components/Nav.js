import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  width: 100%;
  padding: 8px 24px;
  background-color: #6610f2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  h1 {
    padding: 0px;
    margin: 0px;
    color: #fff;
  }
`;

const Logo = styled.img`
  height: 48px;
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Logo src="/images/icons/logo.png" />
      </Container>
    );
  }
}

export default Nav;
