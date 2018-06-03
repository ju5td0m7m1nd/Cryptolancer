import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: #fff;
  border: solid 1px #707070;
  border-left: solid 10px #d11149;
  flex-direction: row;
  margin-top: 30px;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-direction: column;
`;

const Head = styled.h3`
  font-size: 1.5vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #d11149;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Body = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const Datetime = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  color: #969ca0;
`;
const DisputeIconWrapper = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 24px;
    margin-bottom: 8px;
  }
`;
const DisputeCount = styled.div`
  border: 0px;
  background-color: transparent;
  color: #d11149;
  text-align: center;
`;

const DetailBtn = styled.button`
  width: 25%;
  font-size: 1.2vmax;
  font-weight: bold;
  border: 0px;
  background-color: transparent;
  color: #d11149;
  outline: none;
`;

class Dispute extends React.Component {
  constructor(props) {
    super(props);
  }

  _routeToDetail = projectId => {
    this.props.history.push(`/dashboard/court/browse/${projectId}`);
  };

  render() {
    return (
      <Block>
        <DisputeIconWrapper>
          <img src="/images/dispute.svg" />
          <DisputeCount>3 disputes</DisputeCount>
        </DisputeIconWrapper>
        <Center>
          <Head>Convert website to android and iOS application. </Head>
          <Body>
            We use reactjs on website, so it will be easy to convert to app if
            you're familiar with React Native
          </Body>
          <Datetime>2018/05/12 - 2018/06/24</Datetime>
        </Center>
        <DetailBtn onClick={() => this._routeToDetail(1)}>
          More Detail >{" "}
        </DetailBtn>
      </Block>
    );
  }
}

export default withRouter(Dispute);
