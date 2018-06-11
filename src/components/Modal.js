import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(70, 70, 70, 0.5);
  height: 80%;
  padding: 3%;
  z-index: 999;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
  border-bottom: 1px solid #909090;
  h3 {
    font-size: 2vmax;
    color: #303030;
  }
  p {
    font-size: 2vmax;
    color: #303030;
    cursor: pointer;
  }
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Title>
          <h3>{this.props.title}</h3> <p onClick={this.props.cancel}>x</p>
        </Title>
        {this.props.children}
      </Container>
    );
  }
}

export default Modal;
