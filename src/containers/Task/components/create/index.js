import React from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import TaskSummary from "./TaskSummary";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";

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
  letter-spacing: normal;
  text-align: left;
  color: #4894fc;
  width: 30%;
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
  width: 60%;
`;

const NextBtn = styled.button`
  outline: none;
  color: #4894fc;
  border: 0px;
  background-color: transparent;
  position: absolute;
  bottom: 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  font-weight: lighter;
  text-align: left;
  color: #4894fc;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      requiredSkills: [],
      budget: "",
      description: "",
      startDate: "",
      endDate: "",
      spec: "",
      owner: "",
      currentProgress: "basicInfo"
    };
  }
  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };
  _handleChange = (e, type) => this.setState({ [type]: e.target.value });
  _nextStep = () =>
    this.setState({
      currentProgress: Object.keys(PROGRESS)[
        Object.keys(PROGRESS).indexOf(this.state.currentProgress) + 1
      ]
    });

  _submit = async () => {
    const {
      name,
      requiredSkills,
      budget,
      defaultValue,
      startDate,
      endDate,
      spec
    } = this.state;
    const payload = {
      name,
      requiredSkills,
      budget,
      defaultValue,
      startDate,
      endDate,
      spec
    };
    const buffer = Buffer.from(JSON.stringify(payload), "utf8"); // text string to Buffer

    await ipfs.add(buffer, (err, ipfsHash) => {
      // setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      const fileAddress = `https://ipfs.io/ipfs/${ipfsHash[0].hash}`;
      // TODO add to contract
    });
  };
  render() {
    const { currentProgress } = this.state;
    return (
      <Container>
        <ProgressBar currentProgress={currentProgress} PROGRESS={PROGRESS} />
        {Object.keys(PROGRESS).indexOf(currentProgress) < 3
          ? <Wrapper>
              {PROGRESS[currentProgress].map((item, key) =>
                <InputRow key={key}>
                  <Label>
                    {INPUT_NAME[item]}
                  </Label>
                  {item === "spec"
                    ? <Textarea
                        innerRef={c => (this.spec = c)}
                        onKeyUp={() => this._autoGrow(this.spec)}
                        onChange={e => this._handleChange(e, item)}
                      />
                    : <Input
                        key={item}
                        placeholder={INPUT_NAME[item]}
                        defaultValue={this.state[item]}
                        type={
                          item === "budget"
                            ? "number"
                            : item.indexOf("Date") > -1 ? "date" : "normal"
                        }
                        onChange={e => this._handleChange(e, item)}
                      />}
                </InputRow>
              )}
              <NextBtn onClick={this._nextStep}> Next > </NextBtn>
            </Wrapper>
          : <Wrapper>
              <TaskSummary {...this.state} />
              <NextBtn onClick={this._submit}>Submit ></NextBtn>
            </Wrapper>}
      </Container>
    );
  }
}

export default Form;
