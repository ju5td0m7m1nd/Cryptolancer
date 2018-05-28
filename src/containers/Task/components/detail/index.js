import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Container = styled.section`width: 100%;`;

const SectionBlock = styled.div`
  width: 100%;
  padding: 24px;
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

const Spec = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-bottom: 8px;
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
  }
  render() {
    const {
      name,
      description,
      skills,
      budget,
      startDate,
      endDate,
      spec
    } = mockData;
    return (
      <Container>
        <BackBtn
          onClick={() => this.props.history.push("/dashboard/task/browse")}
        >
          {"< Back to Browse"}
        </BackBtn>
        <SectionBlock>
          <InfoWrapper>
            <InfoTitle>
              {name}
            </InfoTitle>
            <InfoDescription>
              {description}
            </InfoDescription>
            <InfoSkills>
              {skills
                .reduce((pre, cur) => pre.concat(`${cur},`), "")
                .slice(0, -1)}
            </InfoSkills>
            <InfoBudget>
              $ {budget}
            </InfoBudget>
          </InfoWrapper>
        </SectionBlock>
        <SectionTitle>Timeline</SectionTitle>
        <SectionBlock>
          <DateInfo>
            <h3>Start Date</h3>
            <p>
              {startDate.toDateString()}
            </p>
          </DateInfo>
          <DateInfo>
            <h3>End Date</h3>
            <p>
              {endDate.toDateString()}
            </p>
          </DateInfo>
        </SectionBlock>
        <SectionTitle>Task Requirement</SectionTitle>
        <SectionBlock>
          {spec.map((s, key) => <Spec key={key}>{`${key + 1}. ${s}`}</Spec>)}
        </SectionBlock>
      </Container>
    );
  }
}

export default withRouter(Detail);
