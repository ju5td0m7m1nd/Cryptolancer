import React from "react";
import styled from "styled-components";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";
import Task from "./Task";

const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  height: 80%;
  position: relative;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Input = styled.input`
  font-size: 16px;
  font-weight: lighter;
  text-align: left;
  color: #4894fc;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
  width: 30%;
  border-bottom: solid 2px #707070;
  font-weight: 500;
  font-style: italic;
`;

const CreatBtn = styled.button`
  outline: none;
  color: #4894fc;
  border: 0px;
  background-color: transparent;

  bottom: 0;
`;

const PROGRESS = {
  basicInfo: ["name", "requiredSkills", "budget", "description"],
  timeline: ["startDate", "endDate"],
  detailSpec: ["spec"],
  submit: []
};

const INPUT_NAME = {
  name: "Name",
  requiredSkills: "Required Skills",
  budget: "Budget",
  description: "Description",
  startDate: "Start date",
  endDate: "End date",
  spec: "Spec"
};

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      requiredSkills: []
    };
  }

  _handleChange = (e, type) => this.setState({ [type]: e.target.value });
  _create = () => {
    this.props.history.push("/dashboard/task/create");
  };

  render() {
    return (
      <Container>
        <Wrapper>
          <InputRow>
            <Input
              placeholder={"Search tasks"}
              onChange={e => this._handleChange(e, "search")}
            />
            <CreatBtn onClick={this._create}> + Creare task</CreatBtn>
          </InputRow>
          <Task />
        </Wrapper>
      </Container>
    );
  }
}

export default Browse;
