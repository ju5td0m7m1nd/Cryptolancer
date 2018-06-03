import React from "react";
import styled from "styled-components";
import Dispute from "./Dispute";

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

class Browse extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Dispute />
        <Dispute />
        <Dispute />
      </Container>
    );
  }
}

export default Browse;
