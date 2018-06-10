import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  background-color: #FFF;
  box-shadow: 0px 2px 4px rgba(70, 70, 70, 0.5);
  height: 80%;
  padding: 3%;
`;

const Title = styled.h3`
  font-size: 2vmax;
  color: #303030;
  border-bottom: 1px solid #909090;
  padding: 12px 0px;
`

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        {this.props.children}
      </Container>
    );
  }
}

export default Modal;
