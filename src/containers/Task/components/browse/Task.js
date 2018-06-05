import React from "react";
import styled from "styled-components";

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: #FFF;
  border: solid 1px #707070;
  border-left: solid 10px #f17105;
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
  color: #f17105;
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

const Price = styled.div`
  width: 25%;
  border: 0px;
  background-color: transparent;
  text-align: center;
`;

const DetailBtn = styled.button`
  width: 25%;
  font-size: 1.2vmax;
  font-weight: bold;
  border: 0px;
  background-color: transparent;
  color: #f17105;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {contract, routeDetail} = this.props;
    return (
      <Block>
        <Price>{contract.budget}</Price>
        <Center>
          <Head>{contract.name}</Head>
          <Body>
           {contract.description}
          </Body>
          <Datetime>{contract.startDate} - {contract.endDate}</Datetime>
        </Center>
        <DetailBtn onClick={() => routeDetail(contract.ipfs)}>More Detail > </DetailBtn>
      </Block>
    );
  }
}

export default Task;
