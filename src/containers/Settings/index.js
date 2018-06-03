import React from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import NavBar from "./components/Nav";
import getWeb3 from "../../utils/getWeb3";
import firebase from "../../utils/firebase";

const Container = styled.section`
  width: 60%;
  height: 100%;
  background-color: tranparent;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  height: 80%;
  position: relative;
`;

const InputRow = styled.div`
  width: 100%;
  border-bottom: solid 1px #bababa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 24px;
  p {
    font-size: 16px;
    font-weight: bold;
    font-family: Raleway;
    text-align: left;
    color: #303030;
    padding: 8px;
    background-color: transparent;
    border: 0px;
    outline: none;
    width: 100%;
  }
`;

const Label = styled.h3`
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  font-family: Raleway;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
  width: 30%;
`;

const Input = styled.input`
  font-size: 16px;
  font-weight: bold;
  font-family: Raleway;
  text-align: left;
  color: #303030;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
  width: 100%;
`;

const UpdateBtn = styled.button`
  color: ${props => props.theme.fg};
  border: 0px;
  background: ${props => props.theme.bg};
  font-size: 1em;
  margin: 1em 0px;
  border-radius: 5px;
  padding: 12px 24px;
  outline: none;
`;

const theme = {
  bg: "#4894fc",
  fg: "white"
};

const Textarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: #303030;
  font-family: Raleway;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      name: "",
      email: "",
      introduction: "",
      web3: null
    };
  }

  componentDidMount() {
    getWeb3.then(web3 => this.setState({ web3: web3.web3 }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.web3 && this.state.web3) {
      this._fetchData(this.state.web3);
    }
  }

  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };

  _handleChange(e, type) {
    const value = e.target.value;
    this.setState({ [type]: value });
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _fetchData = web3 => {
    if (web3 && web3.eth) {
      firebase
        .database()
        .ref(`users/${web3.eth.accounts[0]}`)
        .once("value", snapshot => {
          if (snapshot.val()) {
            this.setState({ ...snapshot.val() });
          }
        });
    }
  };

  _setData = () => {
    const { email, name, introduction, web3 } = this.state;
    if (web3 && web3.eth) {
      firebase.database().ref(`users/${web3.eth.accounts[0]}`).set({
        email,
        name,
        introduction
      });
    }
  };

  _route = path => this.props.history.push(path);

  render() {
    const { match } = this.props;
    const { section } = this.props.match.params;
    const { web3, name, email, introduction } = this.state;
    return (
      <Container>
        <NavBar section={section} color="#E6C229" route={this._route} />
        {web3 && web3.eth
          ? <Wrapper>
              <InputRow>
                <Label>Account</Label>
                <p>
                  {web3.eth.accounts[0]}
                </p>
              </InputRow>
              <InputRow>
                <Label>Name</Label>
                <Input
                  onChange={e => this._handleChange(e, "name")}
                  value={name}
                />
              </InputRow>
              <InputRow>
                <Label>Email</Label>
                <Input
                  onChange={e => this._handleChange(e, "email")}
                  value={email}
                />
              </InputRow>
              <InputRow>
                <Label>Introduction</Label>
                <Textarea
                  onChange={e => this._handleChange(e, "introduction")}
                  value={introduction}
                />
              </InputRow>
              <ThemeProvider theme={theme}>
                <UpdateBtn onClick={this._setData}>Update</UpdateBtn>
              </ThemeProvider>
            </Wrapper>
          : null}
      </Container>
    );
  }
}

export default withRouter(Settings);
