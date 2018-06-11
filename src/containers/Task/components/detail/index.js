import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ipfs, { readIPFS, createIPFS } from "../../../../utils/ipfs";
import Button from "../../../../components/Button";

const Container = styled.section`
  width: 100%;
  padding: 0px 0px 32px;
`;

const SectionBlock = styled.div`
  width: 100%;
  padding: 24px 20% 24px 24px;
  background-color: #fff;
  border: solid 1px #707070;
  border-radius: 16px;
`;

const SectionTitle = styled.h2`
  margin: 24px 0px 12px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
`;
const InfoWrapper = styled.div`width: 100%;`;
const InfoTitle = styled.h3`
  font-family: Raleway;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
`;
const InfoDescription = styled.h4`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-top: 8px;
`;
const InfoBudget = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-top: 12px;
`;
const InfoSkills = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-top: 24px;
`;

const DateInfo = styled.div`
  width: 60%;
  border-bottom: solid 1px #707070;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  padding: 8px 0px;
  h3 {
    width: 30%;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: left;
    color: #303030;
  }
  p {
    font-family: Raleway;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
`;

const Spec = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  p {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
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
`;

const Apply = styled.div``;

const mockData = {
  name: "Convert website to android and iOS application",
  description:
    "We use reactjs on website, so it will be easy to convert to app if you're familiar with React Native",
  skills: ["HTML", "React", "Solidity"],
  budget: 2500000,
  startDate: new Date("2018-05-22"),
  endDate: new Date("2018-06-24"),
  spec: [
    "A user interface based on our .ai file",
    "Login with facebook and email.",
    "Same visualization based on our current website.",
    "Integrate with behavior analytics plugin (ex. GA )",
    "Put it onto App Store and GooglePlay."
  ]
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      loading: true,
      applied: false
    };
  }
  async componentDidMount() {
    try {
      const data = await readIPFS(this.props.match.params.ipfs);
      if (data.status === 0) {
        this.setState({
          task: this.state.task.concat(data),
          loading: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  _apply = async () => {
    const { web3, CPL } = this.props;
    const { task } = this.state;
    const newPayload = Object.assign({}, task[0], {
      contractorApplicant: task[0].contractorApplicant.concat(
        web3.eth.accounts[0]
      )
    });
    const newIPFSHash = await createIPFS(newPayload);
    await CPL.updateContractFromApplicant(
      this.props.match.params.ipfs,
      newIPFSHash,
      task[0].issuer,
      {
        from: web3.eth.accounts[0],
        gas: 3000000
      }
    );
    this.setState({ applied: true });
  };

  render() {
    const { task, applied } = this.state;
    const { web3 } = this.props;
    return (
      <Container>
        <BackBtn
          onClick={() => this.props.history.push("/dashboard/task/browse")}
        >
          {"< Back to Browse"}
        </BackBtn>
        {task.length > 0 && !applied
          ? <div
              style={{
                padding: "0px 0px 32px"
              }}
            >
              <SectionBlock>
                <InfoWrapper>
                  <InfoTitle>
                    {task[0].name}
                  </InfoTitle>
                  <InfoDescription>
                    {task[0].description}
                  </InfoDescription>
                  <InfoSkills>
                    {task[0].requiredSkills}
                  </InfoSkills>
                  <InfoBudget>
                    $ {task[0].budget}
                  </InfoBudget>
                </InfoWrapper>
              </SectionBlock>
              <SectionTitle>Timeline</SectionTitle>
              <SectionBlock>
                <DateInfo>
                  <h3>Start Date</h3>
                  <p>
                    {task[0].startDate}
                  </p>
                </DateInfo>
                <DateInfo>
                  <h3>End Date</h3>
                  <p>
                    {task[0].endDate}
                  </p>
                </DateInfo>
              </SectionBlock>
              <SectionTitle>Task Requirement</SectionTitle>
              <SectionBlock>
                {task[0].detailspec.map((s, key) =>
                  <Spec key={key}>
                    <p>{`${key + 1}. ${s.text}`}</p>
                    <p>{`${s.partition}%`}</p>
                  </Spec>
                )}
              </SectionBlock>
              {web3
                ? web3.eth.accounts[0] !== task[0].issuer
                  ? <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Button text="Apply" onClick={this._apply} />
                    </div>
                  : null
                : null}
            </div>
          : null}
        {applied ? <h2>Your application is under processing.</h2> : null}
      </Container>
    );
  }
}

export default withRouter(Detail);
