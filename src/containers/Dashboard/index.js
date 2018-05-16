import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Form from "./components/Form";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
`;

const SidePanel = styled.div`
  width: 15%;
  height: 100%;
`;

const SidePanelLink = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #707070;
  margin-bottom: 24px;
`;

const Main = styled.main`
  width: 100%;
  height: 85%;
  display: flex;
  padding: 24px 0px;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 85%;
  height: 100%;
`;

const Title = styled.h2`color: #4894fc;`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Nav />
        <Main>
          <SidePanel>
            <SidePanelLink>Task</SidePanelLink>
            <SidePanelLink>Ongoing</SidePanelLink>
            <SidePanelLink>Settings</SidePanelLink>
          </SidePanel>
          <Content>
            <Title>Create Task</Title>
            <Form />
          </Content>
        </Main>
      </Container>
    );
  }
}

export default Dashboard;
