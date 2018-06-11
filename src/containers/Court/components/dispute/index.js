import React from "react";
import styled from "styled-components";
import TaskSummary from "./TaskSummary";
import getWeb3 from "../../../../utils/getWeb3";
import { readIPFS, createIPFS } from "../../../../utils/ipfs";
import { CPLInstance, CPTInstance } from "../../../../utils/getContract";
import Mask from "../../../../components/Mask";

const Container = styled.section`
  background-color: transparent;
  width: 80%;
`;

const Block = styled.div`
  background-color: #fff;
  border-top: solid 1px #707070;
  border: solid 1px #707070;
  width: 100%;
  margin-top: 24px;
  padding: 32px;
  border-radius: 12px;
`;

const DisputeInnerContainer = styled.section`
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const SpecIDBlock = styled.section`
  -webkit-flex: initial;
  flex: initial;
  width: 25%;
  margin-left: 0px;
  margin-right: 10px;
  display: inline;
`;

const ArgumentBlock = styled.section`
  -webkit-flex: none;
  flex: none;
  width: 50%;
  margin-left: 30px;
  margin-right: 10px;
  display: inline;
`;

const JudgementBlock = styled.section`
  -webkit-flex: none;
  flex: none;
  width: 25%;
  margin-left: 30px;
  margin-right: 0px;
  display: inline;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  height: 80%;
  position: relative;
`;

const ProjectName = styled.h2`
  font-size: 1.5vmax;
  font-family: Raleway;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
  margin: 0px;
`;

const Label = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  width: 100%;
  margin-top: 0.5em;
`;

const Title = styled.h2`
  font-size: 1.5vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  margin-top: 24px;
  color: #000000;
  width: 100%;
`;

const Subject = styled.h2`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 25px;
  color: #303030;
  width: 100%;
`;

const Back2BrowseBtn = styled.button`
  font-size: 20px;
  outline: none;
  color: #d11149;
  border: 0px;
  background-color: transparent;
  text-align: left;
`;

const RadioBtn = styled.button`
  type: radio;
  outline: none;
  name: "";
  value: "";

  //color: #d11149;
  border: 0px;
  background-color: transparent;
  text-align: left;
`;

const SubmitBtn = styled.button`
  padding: 12px 36px;
  color: white;
  background-color: #d11149;
  border-radius: 5px;
  font-size: 1.2vmax;
  float: right;
  outline: none;
  border: 0px;
  margin: 24px 0px;
`;

const Hr = styled.hr`
  display: block;
  margin-top: 0.5em;
  margin-bottom: 4em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  color: #707070;
`;
const Line = styled.hr`
  display: block;
  margin-top: -0.5em;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  color: #707070;
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

var IPFS_DATA = "";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfs: props.match.params.ipfs,
      ipfsData: "",
      contract: [],
      startToken: 0,
      authorized: false,
      mask: false,
      isVoted: false
    };
  }

  async componentDidMount() {
    if (this.props.CPL) {
      try {
        const data = await readIPFS(this.props.match.params.ipfs);
        if (data.status === 4) {
          this.setState(
            {
              contract: this.state.contract.concat(data),
              startToken:
                data.jurorApplicant.length > 0
                  ? parseInt(
                      data.jurorApplicant[data.jurorApplicant.length - 1]
                        .startToken,
                      10
                    ) +
                    parseInt(
                      data.jurorApplicant[data.jurorApplicant.length - 1]
                        .tokenNum,
                      10
                    )
                  : 0,
              loading: false,
              judgements: data.disputes.map(d => ({
                specId: d.specId,
                judgement: false
              }))
            },
            this._checkAuthority
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  _checkAuthority = async () => {
    const { CPL, web3 } = this.props;
    const { contract } = this.state;
    const currentUser = web3.eth.accounts[0];
    const contractCount = web3.toDecimal(
      await CPL.getContractFreeCount.call(currentUser)
    );
    var contracts = [];
    var cumulativeAmmount = 0;
    if (
      contract[0].issuer === currentUser ||
      contract[0].contractor === currentUser
    ) {
      alert("You can't arbitrate your own arguments!");
      window.location.href = "/dashboard/court/browse";
    }
    // get currentUser's contracts
    for (let i = 0; i < contractCount; i++) {
      var c = await CPL.getContractFree.call(currentUser, i);
      if (contract[1] == 2) {
        contracts.push(c[0]);
      }
    }
    // read contract and add up cumulative ammount of contract prices
    for (let i = 0; i < contracts.length; i++) {
      const data = await readIPFS(contracts[i]);
      cumulativeAmmount += data.budget;
    }
    if (cumulativeAmmount > this.state.budget) {
      this.setState({
        authorized: true
      });
    }

    // check if the user has already voted
    for (let i = 0; i < contract[0].jurorApplicant.length; i++) {
      if (currentUser === contract[0].jurorApplicant[i].address) {
        this.setState({
          isVoted: true
        });
      }
    }
  };

  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };

  _handleOptionChange = (value, key) => {
    const newJudgements = this.state.judgements;
    newJudgements[key] = Object.assign({}, newJudgements[key], {
      judgement: value
    });
    this.setState({ judgements: newJudgements });
  };

  _getRandNum = async range => {
    const { CPL, web3 } = this.state;
    //range = parseInt(range, 10);
    var tmp = await CPL.randomGen.call(0, range);
    console.log("========== tmp: ", tmp);
    var randNum = web3.toDecimal(
      await CPL.randomGen.call(0, range, 1234, { from: web3.eth.accounts[0] })
    );
    console.log("--randNum: ", randNum);
    return randNum;
  };

  _judge = jurorApplicant => {
    return new Promise(async (resolve, reject) => {
      const { CPL, web3 } = this.props;
      const { contract } = this.state;

      const chosenJurorNum = 3; //choose 3 jurors
      const { disputes } = contract[0];
      // clone array
      var candidates = jurorApplicant.slice(0);
      var chosenJurors = [];
      var chosenResults = []; //[numOfJurors(3)][numOfProblems]
      var jurorTokenNum = [];
      var chosenRandNum = [];

      for (let i = 0; i < chosenJurorNum; i++) {
        let totalTokenFromJurors = 0;
        candidates.forEach(
          j => (totalTokenFromJurors += parseInt(j.tokenNum, 0))
        );
        // call random function from smart contract
        var chosenNum = web3.toDecimal(
          await CPL.randomGen.call(
            0,
            totalTokenFromJurors,
            totalTokenFromJurors,
            { from: web3.eth.accounts[0] }
          )
        );
        var addUpToken = parseInt(candidates[0].tokenNum, 10);
        var nextCandidate = 1;
        var decArray = [];

        while (addUpToken <= chosenNum) {
          addUpToken =
            addUpToken + parseInt(candidates[nextCandidate++].tokenNum);
        }
        var chosenPos =
          chosenNum -
          (addUpToken - parseInt(candidates[nextCandidate - 1].tokenNum));
        chosenPos =
          parseInt(candidates[nextCandidate - 1].startToken) + chosenPos;
        chosenRandNum.push(chosenPos);

        chosenJurors.push(candidates[nextCandidate - 1].address);
        for (let j = 0; j < disputes.length; j++) {
          if (candidates[nextCandidate - 1].judgements[j].judgement) {
            decArray.push(true);
          } else {
            decArray.push(false);
          }
        }
        jurorTokenNum.push(candidates[nextCandidate - 1].tokenNum);
        chosenResults.push(decArray);
        candidates.splice(nextCandidate - 1, 1);
      }
      var finalResult = [];
      var jurorCorrectNum = [];

      for (let i = 0; i < chosenJurorNum; i++) {
        jurorCorrectNum.push(0);
      }
      //get final voting result
      for (let i = 0; i < disputes.length; i++) {
        var decTmp = 0;
        for (let j = 0; j < chosenJurorNum; j++) {
          decTmp += chosenResults[j][i];
        }
        if (decTmp > chosenJurorNum / 2) {
          finalResult.push(1);
        } else {
          finalResult.push(0);
        }
        // tell if juror chose the right side
        for (let j = 0; j < chosenJurorNum; j++) {
          if (finalResult[i] == chosenResults[j][i]) {
            jurorCorrectNum[j] += 1;
          }
        }
      }
      const loser = finalResult.reduce((pre, cur) => {
        return pre + cur;
      }, 0);
      let loserSide;
      if (loser != 0) {
        //freelancer addr
        loserSide = "freelancer";
      } else {
        //issuer addr
        loserSide = "issuer";
      }

      resolve({
        finalResult,
        chosenJurors,
        jurorCorrectNum,
        jurorTokenNum,
        chosenRandNum,
        loserSide
      });
    });
  };

  _handleChange = e => {
    this.setState({ tokenNum: e.target.value });
  };

  _submit = async () => {
    const { tokenNum, judgements, contract, startToken } = this.state;
    const { CPT, web3, CPL } = this.props;
    const balance = web3.toDecimal(await CPT.balanceOf(web3.eth.accounts[0]));
    if (tokenNum <= balance && tokenNum > 0) {
      const payload = {
        address: web3.eth.accounts[0],
        judgements,
        tokenNum,
        startToken
      };
      const jurorApplicant = contract[0].jurorApplicant.concat(payload);

      if (jurorApplicant.length >= 5) {
        this._onLoading();
        const result = await this._judge(jurorApplicant);
        const newIPFSData = Object.assign(
          {},
          contract[0],
          {
            selectedNumber: result.chosenRandNum,
            jurors: result.chosenJurors,
            finalResult: result.finalResult,
            jurorApplicant
          },
          { status: parseInt(contract[0].status) + 1 }
        );
        console.log(newIPFSData);
        const newIPFS = await createIPFS(newIPFSData);
        console.log(newIPFS);
      } else {
        this._onLoading();
        const newIPFSData = Object.assign({}, contract[0], { jurorApplicant });
        const newIPFS = await createIPFS(newIPFSData);
        await CPL.updateContractFromApplicant(
          this.props.match.params.ipfs,
          newIPFS,
          contract[0].issuer,
          {
            from: web3.eth.accounts[0],
            gas: 3000000
          }
        );

        this._endLoading();
        this.setState({ isVoted: true });
      }
    } else {
      alert("Balance not enough");
    }
  };

  _onLoading = () => this.setState({ mask: true });
  _endLoading = () => this.setState({ mask: false });

  render() {
    const { contract, judgements, mask, isVoted } = this.state;

    return (
      <Container>
        {mask ? <Mask /> : null}
        <Back2BrowseBtn
          onClick={() => this.props.history.push("/dashboard/court/browse")}
        >
          {" "}&lt; Back to Browse
        </Back2BrowseBtn>
        {contract.length > 0 && !isVoted
          ? <div>
              <Block>
                <ProjectName>
                  {contract[0].name}
                </ProjectName>
                <Label>
                  {contract[0].description}
                </Label>
              </Block>
              <Title>Task Requirement</Title>
              <Block>
                <Subject>Detail specification</Subject>
                <Label>
                  {contract[0].detailspec.map((s, key) =>
                    <Spec key={key}>
                      <p>{`${key + 1}. ${s.text}`}</p>
                      <p>{`${s.partition}%`}</p>
                    </Spec>
                  )}
                </Label>
                <Hr />
              </Block>
              <Title>Dispute</Title>
              <Block>
                <DisputeInnerContainer>
                  <SpecIDBlock>
                    <Label>Spec ID</Label>
                  </SpecIDBlock>
                  <ArgumentBlock>
                    <Label>Argument</Label>
                  </ArgumentBlock>
                  <JudgementBlock>
                    <Label>Judgement</Label>
                    <RadioBtn />
                  </JudgementBlock>
                </DisputeInnerContainer>
                <Line />
                <Label>
                  {judgements.map((j, key) =>
                    <DisputeInnerContainer key={key}>
                      <SpecIDBlock>
                        <Label>
                          #{j.specId}
                        </Label>
                      </SpecIDBlock>
                      <ArgumentBlock>
                        <Label>
                          {contract[0].disputes[key].argument}
                        </Label>
                      </ArgumentBlock>
                      <JudgementBlock>
                        <Label>
                          <input
                            type="radio"
                            checked={j.judgement}
                            onChange={e => this._handleOptionChange(true, key)}
                            style={{ marginRight: "8px" }}
                          />
                          Reasonable
                        </Label>
                        <Label>
                          <input
                            type="radio"
                            checked={!j.judgement}
                            onChange={e => this._handleOptionChange(false, key)}
                            style={{ marginRight: "8px" }}
                          />
                          Not Convincible
                        </Label>
                      </JudgementBlock>
                    </DisputeInnerContainer>
                  )}
                </Label>
                <Hr />
              </Block>
              <Title>Attachment</Title>
              <Block>
                {contract[0].attachments.map(
                  (a, key) =>
                    a.type === "hyperlink"
                      ? <a href={a.value} key={key}>
                          {a.value}
                        </a>
                      : null
                )}
              </Block>
              <Title>Token</Title>
              <Block>
                <input
                  type="number"
                  value={this.state.tokenNum}
                  onChange={this._handleChange}
                />
              </Block>
              <SubmitBtn
                onClick={this._submit}
                disabled={this.state.isVoted && this.state.authorized}
                //disabled={this.state.submit === "finish" || this.state.authority === "uncapable"}
              >
                Apply
              </SubmitBtn>
            </div>
          : null}
        {isVoted
          ? <h3 style={{ marginTop: "48px" }}>
              You've joined this arbitration.
            </h3>
          : null}
      </Container>
    );
  }
}

export default Form;
