import React from "react";
import styled from "styled-components";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";
import { withRouter } from "react-router";

const Container = styled.section`
  background-color: #f9f9f9;
  width: 100%;
  height: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  background-color: #fff;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  height: 80%;
  position: relative;
  border-radius: 12px;
  padding: 40px;
  border: solid 1px #707070;
`;

const Head = styled.h3`
  font-size: 2vmax;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f17105;
  width: 100%;
`;

const Body = styled.h3`
  font-size: 1.5vmax;
  font-weight: 700;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
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
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: black;
  width: 50%;
`;

const Input = styled.input`
  font-size: 1.2vmax;
  font-weight: lighter;
  text-align: left;
  color: #303030;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
  width: 60%;
`;

const Btn = styled.button`
  padding: 12px 36px;
  color: white;
  background-color: #6610f2;
  border-radius: 5px;
  font-size: 1.5vmax;
  float: right;
  outline: none;
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 1.2vmax;
  font-weight: lighter;
  text-align: left;
  color: #303030;
  margin-top: 20px;
  background-color: transparent;
  border: 0px;
  outline: none;
`;

const Block = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: #f9f9f9;
  flex-direction: row;
  align-items: flex-end;
`;

const BackBtn = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f17105;
  margin-bottom: 32px;
  cursor: pointer;
`;

const SpecContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #909090;
  input {
    width: 60%;
    border: 0px;
    padding: 8px 0px;
    outline: none;
    font-size: 1.2vmax;
  }
`;

const SpecBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 10%;
`;
const CreateSpec = styled.div`
  color: #23702f;
  font-size: 18px;
`;
const RemoveSpec = styled.div`
  color: #ef2d56;
  font-size: 18px;
  margin-left: 12px;
`;

const PROGRESS = {
  basicInfo: ["name", "requiredSkills", "budget", "description"],
  timeline: ["startDate", "endDate"],
  taskrequirement: ["detailspec"],
  submit: []
};

const INPUT_NAME = {
  name: "Title",
  requiredSkills: "Required Skills",
  budget: "Budget",
  description: "Description",
  startDate: "Start Date",
  endDate: "End Date",
  detailspec: "Detail specification"
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
      detailspec: [
        {
          text: "",
          partition: 100
        }
      ],
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
  _createSpec = () => {
    this.setState({
      detailspec: this.state.detailspec.concat({ text: "", partition: 0 })
    });
  };
  _handleSpecChange = (e, type, index) => {
    const newSpec = Object.assign(this.state.detailspec[index], {
      [type]: e.target.value
    });
    this.state.detailspec[index] = newSpec;
    this.setState({ detailspec: this.state.detailspec });
  };
  _removeSpec = index => {
    const { detailspec } = this.state;
    this.setState({
      detailspec: detailspec
        .slice(0, index)
        .concat(detailspec.slice(index - detailspec.length + 1))
    });
  };

  _submit = async () => {
    const {
      name,
      requiredSkills,
      budget,
      description,
      startDate,
      endDate,
      detailspec
    } = this.state;
    const { CPL, web3 } = this.props;
    const payload = {
      name,
      requiredSkills,
      budget,
      startDate,
      endDate,
      detailspec,
      description,
      status: 0,
      issuer: web3.eth.accounts[0],
      contractor: null,
      contractorApplicant: [],
      jurorApplicant: [],
      jurors: [],
      selectedNumber: [],
      finalResult: [],
      disputes: [],
    };

    if (
      detailspec.reduce((pre, cur) => {
        return parseInt(pre, 10) + parseInt(cur.partition, 10);
      }, 0) !== 100
    ) {
      window.alert("Partition sum up must be 100");
      return;
    } else if (
      Object.values(payload).filter(value => value === "").length > 0
    ) {
      window.alert("Missing some field");
      return;
    }
    const buffer = Buffer.from(JSON.stringify(payload), "utf8"); // text string to Buffer

    await ipfs.add(buffer, async (err, ipfsHash) => {
      // setState by setting ipfsHash to ipfsHash[0].hash
      //this.setState({ ipfsHash: ipfsHash[0].hash });
      //const fileAddress = `https://ipfs.io/ipfs/${ipfsHash[0].hash}`;
      await CPL.createProject(name, ipfsHash[0].hash, budget, {
        from: web3.eth.accounts[0]
      });
      this.props.history.push("/dashboard/task/browse");
      //console.log(fileAddress);
    });
  };
  render() {
    //const { currentProgress } = this.state;
    const { detailspec } = this.state;
    return (
      <Container>
        <BackBtn
          onClick={() => this.props.history.push("/dashboard/task/browse")}
        >
          {"< Back to Browse"}
        </BackBtn>
        <Head>Create Task</Head>
        <Body>Basic Info</Body>
        <Wrapper>
          {PROGRESS["basicInfo"].map((item, key) =>
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
        </Wrapper>
        <Body>Tineline</Body>
        <Wrapper>
          {PROGRESS["timeline"].map((item, key) =>
            <InputRow key={key}>
              <Label>
                {INPUT_NAME[item]}
              </Label>
              <Input
                key={item}
                placeholder={INPUT_NAME[item]}
                defaultValue={this.state[item]}
                type="date"
                onChange={e => this._handleChange(e, item)}
              />
            </InputRow>
          )}
        </Wrapper>
        <Body>Task Requirement</Body>
        <Wrapper>
          {PROGRESS["taskrequirement"].map((item, key) =>
            <InputRow key={key} style={{ display: "block", border: "0px" }}>
              <InputRow
                style={{ padding: "12px 0px", justifyContent: "flex-start" }}
              >
                <Label style={{ width: "60%" }}>
                  {INPUT_NAME[item]}
                </Label>
                <Label style={{ width: "20%" }}>Partition</Label>
              </InputRow>
              {detailspec.map((spec, key) =>
                <SpecContainer key={key}>
                  <input
                    onChange={e => this._handleSpecChange(e, "text", key)}
                    defaultValue={spec.text}
                    placeholder={"Describe your spec in detail"}
                  />
                  <div style={{ width: "30%" }}>
                    <input
                      onChange={e =>
                        this._handleSpecChange(e, "partition", key)}
                      value={spec.partition}
                      placeholder={"Percentage of the budget"}
                      type="number"
                    />
                    <span>%</span>
                  </div>
                  <SpecBtnWrapper>
                    {key === detailspec.length - 1
                      ? <CreateSpec onClick={this._createSpec}> + </CreateSpec>
                      : null}
                    {key !== 0 || detailspec.length > 1
                      ? <RemoveSpec onClick={() => this._removeSpec(key)}>
                          {" "}-{" "}
                        </RemoveSpec>
                      : null}
                  </SpecBtnWrapper>
                </SpecContainer>
              )}
            </InputRow>
          )}
        </Wrapper>
        <Block>
          <Head />
          <Btn onClick={this._submit}>SUBMIT</Btn>
        </Block>
      </Container>
    );
  }
}

export default withRouter(Form);
