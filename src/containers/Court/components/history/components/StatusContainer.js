import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border: solid 1px #707070;
  background-color: #fff;
  margin-top: 36px;
`;

const DetailContainer = styled.div`
  padding: 24px;
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  line-height: 2vmax;
  color: #707070;
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #707070;
  border-left: solid 10px #D11149;
  flex-direction: row;
  padding: 16px 24px;
`;
const Dispute = styled.div`
  width: 25%;
  font-size: 1vmax;
  border: 0px;
  background-color: transparent;
  color: #D11149;
  text-align: left;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Head = styled.h3`
  font-size: 2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #D11149;
  width: 100%;
  margin-bottom: 12px;
`;

const Status = styled.h3`
  font-size: 1.3vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 6vmax;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  font-weight: bold;
  color: #707070;
`;

const Description = styled.h4`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  //font-weight: bold;
  margin-top: 10px;
  color: #707070;
`;
const DetailBtn = styled.button`
  width: 25%;
  font-size: 1.2vmax;
  font-weight: bold;
  border: 0px;
  background-color: transparent;
  justify-content: space-between;
  color: #707070;
`;

const TYPE = [
  "Picking Jurors",
  "Selected",
  "Not Selected"
];

class StatusContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPartition: 0,
      userAward: 0,
      userTokenAward: 0
    };
  }
  async componentDidMount() {
    if(this.props.contract.type == 1) {
      this._getWinnerAward();
    }
  }
  _getDetatilBlock = () => {
    const { contract, web3, CPL, CPT, onLoading, endLoading, user } = this.props;
    switch (contract.type) {
      case 0:
        return(
          <div>
            <Description>
              {contract.jurorApplicant.length} / 10
            </Description>
            <Description>
              {parseInt(contract.jurorApplicant[contract.jurorOrder].startToken)}
              &nbsp;-&nbsp; 
              {parseInt(contract.jurorApplicant[contract.jurorOrder].startToken) + parseInt(contract.jurorApplicant[contract.jurorOrder].tokenNum) - 1}
            </Description>
          </div>
        );
      case 1:
        return(
          <div>
            <Description>
              The arbitration is established.
            </Description>  
            <Description>
              Arbitration fee ${ this.state.userAward.toFixed(2) } transfered.
            </Description>
            <Description>
              { this.state.userTokenAward.toFixed(2) } token transfered.
            </Description>
          </div>
        );
      case 2:
        return(
          <div>
            <Description>
              You are not selected as the juror.
            </Description>
          </div>
        );

      default:
        return(
          <label>{contract.startDate}</label>
        );
    }
  };

  _getWinnerAward = () => {
    const { contract, user } = this.props;
    const jurors = contract.jurors;
    const jurorApplicant = contract.jurorApplicant;
    const serviceCharge = parseInt(contract.budget)*0.1;
    var jurorCorrectNum = new Array(jurors.length).fill(0);
    var jurorTokenNum = new Array(jurors.length).fill(0);
    var userIdx = 0;
    for (let i=0; i<jurors.length; i++) {
      for (let j=0; j<jurorApplicant.length; j++) {
        if(jurors[i]==jurorApplicant[j].address) {
          if(jurors[i]==user) userIdx = i;
          for(let k=0; k<jurorApplicant[j].judgements.length; k++){
            if(jurorApplicant[j].judgements[k].judgement == true && contract.finalResult[k] == 1){
              jurorCorrectNum[i] += 1;
            }
            else if(jurorApplicant[j].judgements[k].judgement == false && contract.finalResult[k] == 0){
              jurorCorrectNum[i] += 1;
            }
          }
          jurorTokenNum[i] = parseInt(jurorApplicant[j].tokenNum);
        }
      }
    }
    var userPartition = 0;
    var correctNumSum = 0;
    var tokenSum = 0;
    for(let i=0; i<jurors.length; i++) {
      correctNumSum += jurorCorrectNum[i];
      tokenSum += jurorTokenNum[i];
    }
    userPartition = (jurorTokenNum[userIdx]/tokenSum)*(jurorCorrectNum[userIdx]/correctNumSum);
    
    this.setState({
      userAward: serviceCharge*userPartition,
      userTokenAward: tokenSum*userPartition
    });

  };

  render() {
    const { contract, routeMyJudge } = this.props;
    return (
      <Container>
        <Block>
          <Dispute>{contract.disputes.length} dispute(s)</Dispute>
          <Center>
            <Head>
              {contract.name}
            </Head>
            <Status>
            &#8212;&nbsp; {TYPE[contract.type]}
            </Status>
          </Center>
          <DetailBtn onClick={() => routeMyJudge(contract.ipfs)}>My Judgement</DetailBtn>
        </Block>
        <DetailContainer>
          {this._getDetatilBlock()}
        </DetailContainer>
      </Container>
    );
  }
}

export default StatusContainer;
