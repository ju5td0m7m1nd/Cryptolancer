import React from "react";
import styled from "styled-components";
import Form from "./Form";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Title = styled.h2`color: #4894fc;`;

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Form />
      </Container>
    );
  }
}

export default CreateTask;
