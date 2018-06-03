import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Task from "../Task";
import Court from "../Court";
import Wallet from "../Wallet";
import Settings from "../Settings";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const SidePanel = styled.div`
  width: 20%;
  height: 100%;
  padding: 0px 0px;
`;

const SidePanelLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: 8px;
  color: ${props => (props.activate ? props.borderColor : "#ABADAE")};
  padding: 16px 0px;
  border-left: ${props =>
    props.activate
      ? `6px solid ${props.borderColor}`
      : "6px solid transparent"};
  p {
    font-size: 20px;
  }
`;

const LinkIcon = styled.img`
  width: 24px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Main = styled.main`
  width: 100%;
  height: 85%;
  padding-top: 2%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 80%;
  height: 100%;
`;

const Title = styled.h2`color: #4894fc;`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  _route = path => (window.location.href = path);

  render() {
    const { location, match } = this.props;
    const section = location.pathname.split("dashboard/")[1];

    return (
      <Container>
        <Nav />
        <Main>
          <SidePanel>
            <SidePanelLink
              onClick={() => this._route("/dashboard/task/browse")}
              activate={section.indexOf("task") > -1}
              borderColor="#F17105"
            >
              <LinkIcon src="/images/icons/task.svg" />
              <p>Task</p>
            </SidePanelLink>
            <SidePanelLink
              activate={section.indexOf("court") > -1}
              onClick={() => this._route("/dashboard/court")}
              borderColor="#D11149"
            >
              <LinkIcon src="/images/icons/settings.svg" />
              <p>Court</p>
            </SidePanelLink>
            <SidePanelLink
              activate={section.indexOf("wallet") > -1}
              onClick={() => this._route("/dashboard/wallet")}
              borderColor="#6610F2"
            >
              <LinkIcon src="/images/icons/wallet.svg" />
              <p>Wallet</p>
            </SidePanelLink>
            <SidePanelLink
              activate={section.indexOf("settings") > -1}
              onClick={() => this._route("/dashboard/settings")}
              borderColor="#E6C229"
            >
              <LinkIcon src="/images/icons/settings.svg" />
              <p>Settings</p>
            </SidePanelLink>
          </SidePanel>
          <Content>
            <Switch>
              <Route path={`${match.url}/task/:section`} component={Task} />
              <Route path={`${match.url}/court`} component={Court} />
              <Route path={`${match.url}/wallet`} component={Wallet} />
              <Route path={`${match.url}/settings`} component={Settings} />
            </Switch>
          </Content>
        </Main>
      </Container>
    );
  }
}

export default withRouter(Dashboard);
