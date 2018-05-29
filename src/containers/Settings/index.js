import React from "react";
import styled, {ThemeProvider} from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withFormik, Form, Field } from 'formik'
import { Button } from 'reactstrap';

const Container = styled.section`
  background-color: #fff;
  border-top: solid 1px #707070;
  width: 80%;
  height: 80%;
  margin-top: 24px;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 80%;
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
  margin-bottom: 24px;
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
  border: 5px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 20px;
`;

const theme = {
  bg: '#4894fc',
  fg: 'white'
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
  constructor (props) {
    super(props);
    this.state = {
      account: "",
      name: "",
      email: "",
      introduction: ""
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };

  _handleChange(e, type) {
    const value = e.target.value;
    this.setState({ [type] : value });
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <InputRow>
            <Label>Account</Label>
            <Input value={this.state.account} />
          </InputRow>
          <InputRow>
            <Label>Name</Label>
            <Input onChange={e => this._handleChange(e, "name")} />
          </InputRow>
          <InputRow>
            <Label>Email</Label>
            <Input onChange={e => this._handleChange(e, "email")} />
          </InputRow>
          <InputRow>
            <Label>Introduction</Label>
            <Textarea onChange={e => this._handleChange(e, "introduction")} />
          </InputRow>
          <ThemeProvider theme={theme}>
            <UpdateBtn onClick={this._handleSubmit}>Update</UpdateBtn>
          </ThemeProvider>
        </Wrapper>
      </Container>
    );
  }
}

export default Settings;
