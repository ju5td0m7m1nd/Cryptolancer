import React from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";

const Container = styled.div`width: 100%;`;

const Row = styled.div`
  width: 90%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #707070;
`;
const SpecInfoWrapper = styled.div`
  width: 60%;
  display: flex
  justify-content: flex-start;
  align-items: flex-start;
`;

const Info = styled.div`
  font-size: 1.4vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  text-align: left;
  color: #303030;
  margin-right: 32px;
`;

const JudgementWrapper = styled.div`
  display: flex
  justify-content: flex-end;
  align-items: center;
`;
const Option = styled.div`
  margin-left: 12px;
  display: flex
  justify-content: center;
  align-items: center;
  div {
    width: 1.2vmax;
    height: 1.2vmax;
    margin-right: 8px;
    border-radius: 50%;
    border: 1px solid #6610f2;
  }
  h3 {
    font-size: 1.2vmax;
    font-family: Raleway;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    text-align: left;
    color: #6610f2;
  }
`;

const mockData = [
  {
    partition: 50,
    spec: "abc"
  },
  {
    partition: 20,
    spec: "def"
  },
  {
    partition: 30,
    spec: "ghi"
  }
];
class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        {mockData.map((d, key) =>
          <Row key={key}>
            <SpecInfoWrapper>
              <Info>
                {d.partition}%
              </Info>
              <Info>
                {d.spec}
              </Info>
            </SpecInfoWrapper>
            <JudgementWrapper>
              <Option>
                <div />
                <h3>Accept</h3>
              </Option>
              <Option>
                <div />
                <h3>Decline</h3>
              </Option>
            </JudgementWrapper>
          </Row>
        )}
      </Container>
    );
  }
}

export default ReviewForm;
