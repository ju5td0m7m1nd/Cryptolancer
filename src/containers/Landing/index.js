import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #fefefe;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 72px;
`;

const NavBar = styled(Flex)`
  justify-content: space-between;
  background-color: #FFF;
  img {

  }
`;
const NavBarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
`;
const Item = styled.h3`
  margin-left: 15%;
  font-family: Raleway;
  font-size: 1.5vmax;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;

  text-align: center;
  color: #6610f2;
`;
const Banner = styled(Flex)`

`;
const Solution = styled(Flex)`

`;
const Ecosystem = styled(Flex)`

`;
const Token = styled(Flex)`

`;
const Team = styled(Flex)`

`;
const Footer = styled(Flex)`
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <NavBar>
          <img />
          <NavBarItems>
            <Item>How it works</Item>
            <Item>CL Token</Item>
            <Item>Team</Item>
          </NavBarItems>
        </NavBar>
        <Banner />
        <Solution />
        <Ecosystem />
        <Token />
        <Team />
        <Footer />
      </Container>
    );
  }
}

export default Landing;
