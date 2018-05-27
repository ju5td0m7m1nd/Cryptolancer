import React from "react";
import styled from "styled-components";

const Container = styled.div`width: 100%;`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #4894fc;
`;

const Budget = styled.div`
  border-radius: 12px;
  background-color: #4894fc;
  padding: 12px;
  color: #fff;
`;

const DateBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 24px;
`;

const DateLabel = styled.h3`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #4d4242;
`;

const Date = styled.h4`
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #969ca0;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 12px;
`;

const Spec = styled.h3`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #969ca0;
`;

class TaskSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      startDate,
      endDate,
      description,
      budget,
      spec,
      requiredSKills
    } = this.props;
    return (
      <Container>
        <Title>
          {name}
        </Title>
        <InfoWrapper style={{ borderBottoms: "solid 1px #707070" }}>
          <Budget>
            $ {budget}
          </Budget>
          <InfoWrapper>
            <DateBlock>
              <DateLabel>Start Date</DateLabel>
              <Date>
                {startDate}
              </Date>
            </DateBlock>
            <DateBlock>
              <DateLabel>End Date</DateLabel>
              <Date>
                {endDate}
              </Date>
            </DateBlock>
          </InfoWrapper>
        </InfoWrapper>
        <Spec>
          {spec}
        </Spec>
      </Container>
    );
  }
}

export default TaskSummary;
