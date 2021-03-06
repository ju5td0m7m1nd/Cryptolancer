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
  margin-bottom: 32px;
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
          activate={section === "browse"}
          color={color}
          onClick={() => route("/dashboard/task/browse")}
        >
          BROWSE
        </NavItem>
        <NavItem
          activate={section === "issued"}
          color={color}
          onClick={() => route("/dashboard/task/issued")}
        >
          ISSUED
        </NavItem>
        <NavItem
          activate={section === "contracted"}
          color={color}
          onClick={() => route("/dashboard/task/contracted")}
        >
          CONTRACTED
        </NavItem>
      </Nav>
    );
  }
}

export default Navbar;
