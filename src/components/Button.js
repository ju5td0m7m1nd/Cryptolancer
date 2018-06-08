import React from "react";
import styled from "styled-components";

const Container = styled.button`
  padding: 12px 36px;
  color: white;
  background-color: #6610f2;
  border-radius: 5px;
  font-size: 1.5vmax;
  float: right;
  outline: none;
  margin-top: 20px;
`;

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container onClick={this.props.onClick}>
        {this.props.text}
      </Container>
    );
  }
}
