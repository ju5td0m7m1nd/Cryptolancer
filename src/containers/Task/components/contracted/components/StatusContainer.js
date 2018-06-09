import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border: solid 1px #707070;
  background-color: #fff;
  margin-top: 36px;
`;

const DetailContainer = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #707070;
  border-left: solid 10px #f17105;
  flex-direction: row;
  padding: 16px 24px;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Head = styled.h3`
  font-size: 1.5vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f17105;
  width: 100%;
  margin-bottom: 12px;
`;

const Status = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  font-weight: bold;
  color: #707070;
`;

const Description = styled.h3`
  font-family: Raleway;
  font-size: 1.5vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
`;

const STATUS = [
  "Waiting Talented",
  "Under Construction",
  "Reviewing",
  "Finished",
  "Denied, select jurors for abritration",
  " Arbitration done"
];

class StatusContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  _getDetatilBlock = () => {
    const { contract, web3, CPL } = this.props;
    switch (contract.status) {
      case 0:
        return <Description>Text</Description>;
        break;
      case 1:
        return <Description>Waiting for submit.</Description>;
      case 2:
        return <Description>Text</Description>;
      case 3:
        return <Description>Text</Description>;
      case 4:
        return <Description>Text</Description>;
      case 5:
        return <Description>Text</Description>;
    }
  };
  render() {
    const { contract } = this.props;
    return (
      <Container>
        <Block>
          <Center>
            <Head>
              {contract.name}
            </Head>
            <Status>
              {STATUS[contract.status]}
            </Status>
          </Center>
        </Block>
        <DetailContainer>
          {this._getDetatilBlock()}
        </DetailContainer>
      </Container>
    );
  }
}

export default StatusContainer;
