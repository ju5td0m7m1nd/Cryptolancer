import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.section`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #707070;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5%;
`;

const NavItem = styled.div`
  padding: 16px;
  border-bottom: ${props =>
    props.activate ? `5px solid ${props.color}` : "5px solid transparent"};

  color: ${props => (props.activate ? props.color : "#707070")};
  text-decoration: none;
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { section, color, route } = this.props;
    return (
      <Nav>
        <NavItem
          activate
          color={color}
          onClick={() => route("/dashboard/wallet")}
        >
          TRANCTION
        </NavItem>

      </Nav>
    );
  }
}

export default Navbar;
