import React from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { createIPFS } from "../../../../../utils/ipfs";

const Container = styled.div`width: 100%;`;

const Row = styled.div`
  width: 90%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
  div {
    width: 1.2vmax;
    height: 1.2vmax;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${props => (props.result ? "#6610f2" : "#FFF")}
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

const ArgumentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 12px 24px;
  flex-direction: column;
  textarea {
    width: 50%;
    padding: 24px;
  }
  h4 {
    font-size: 1.2vmax;
    font-weight: bold;
    color: #909090;
    margin-bottom: 8px;
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
    this.state = {
      reviewResult: props.contract
        ? props.contract.detailspec.map(s => ({ result: true, argument: "" }))
        : []
    };
  }

  _updateResult = (key, result) => {
    const newReviewResult = this.state.reviewResult;
    newReviewResult[key] = { result, argument: "" };
    this.setState({ reviewResult: newReviewResult });
  };

  _updateArgument = (key, argument) => {
    const newReviewResult = this.state.reviewResult;
    newReviewResult[key] = Object.assign({}, newReviewResult, { argument });
    this.setState({ reviewResult: newReviewResult });
  };

  _submitResult = async () => {
    const { web3, CPL, contract, address, CPT } = this.props;
    const { reviewResult } = this.state;
    const failedResult = reviewResult.filter(r => !r.result);
    const ifFailed = failedResult.length > 0;
    if (ifFailed) {
      console.log(failedResult);
    } else {
      this.props.onLoading();
      const newPayload = Object.assign({}, contract, {
        reviewResult,
        status: contract.status + 1
      });
      const newIPFS = await createIPFS(newPayload);
      await CPL.terminateContract(
        contract.issuer,
        contract.contractor,
        contract.ipfs,
        100,
        CPT.address,
        newIPFS,
        { from: web3.eth.accounts[0] }
      );
      this.props.endLoading();
      console.log("Success");
    }
  };

  render() {
    const { contract } = this.props;
    const { reviewResult } = this.state;
    const { detailspec } = contract;
    return (
      <Container>
        {detailspec.map((d, key) =>
          <div key={key} style={{ borderBottom: "1px solid #707070" }}>
            <Row>
              <SpecInfoWrapper>
                <Info>
                  {d.partition}%
                </Info>
                <Info>
                  {d.text}
                </Info>
              </SpecInfoWrapper>
              <JudgementWrapper>
                <Option
                  result={reviewResult[key].result === true}
                  onClick={() => this._updateResult(key, true)}
                >
                  <div />
                  <h3>Accept</h3>
                </Option>
                <Option
                  result={reviewResult[key].result === false}
                  onClick={() => this._updateResult(key, false)}
                >
                  <div />
                  <h3>Decline</h3>
                </Option>
              </JudgementWrapper>
            </Row>
            {!reviewResult[key].result
              ? <ArgumentWrapper>
                  <h4>Decline Reason</h4>
                  <textarea
                    defaultValue={reviewResult[key].argument}
                    onChange={e => this._updateArgument(key, e.target.value)}
                  />
                </ArgumentWrapper>
              : null}
          </div>
        )}
        <Button
          text="Submit Review"
          style={{ fontSize: "1.2vmax" }}
          onClick={this._submitResult}
        />
      </Container>
    );
  }
}

export default ReviewForm;
