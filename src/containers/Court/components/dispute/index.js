import React from "react";
import styled from "styled-components";
import TaskSummary from "./TaskSummary";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";
import { CPLInstance } from "../../../../utils/getContract";

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

var IPFS_DATA = "";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CPL: null,
      web3: null,
      ipfsData: "",
      currentUser: "testUser",
      authority: "uncapable",
      balance: 0,
      tokenNum: 0,
      name: "<test> Convert website to android and iOS application",
      description:
        "<test> We use reactjs on website so it will be easy to convert to app if you're familiar with React Native",
      detailSpec: "<test> Put it onto App store and GooglePlay.",
      disputes: [""],
      disputeLength: 0,
      jurors: null,
      submit: "unfinished"
    };
  }

  async componentDidMount() {
    const CPL = await CPLInstance();
    const web3 = (await getWeb3).web3;
    web3.eth.getBalance(web3.eth.accounts[0], (err, res) => {
      var balance = web3.toDecimal(res);
      this.setState({balance: balance});
    });
    this.setState(
      { 
        CPL: CPL, 
        web3: web3,
        currentUser: web3.eth.accounts[0]
      },
      function() {
        console.log("web3: ", this.state.web3);
        console.log("CPL: ", this.state.CPL);
        console.log("user: ", this.state.currentUser);
        console.log("user balance: ", this.state.balance);
      }
    );
    this._initData(CPL, web3);
  }

  _checkAuthority = async () => {
    const { CPL, web3, currentUser, jurors} = this.state;
    const contractCount = web3.toDecimal(await CPL.getContractFreeCount.call(currentUser));
    var contracts = [];
    var cumulativeAmmount = 0;
    console.log("currentUser: ", currentUser, " \\ contract num: ", contractCount);

    // get currentUser's contracts 
    for (let i = 0; i < contractCount; i++) {
      var contract = await CPL.getContractFree.call(currentUser, i);
      if(contract[1] == 2) {
        contracts.push(contract[0]);
      }
    }
    // read contract and add up cumulative ammount of contract prices
    for (let i=0; i<contracts.length; i++) {
      ipfs.files.cat(contracts[i], function(err, res) {
        if (!err) {
          const IPFS_DATA = res.toString();
          const content = JSON.parse(IPFS_DATA);
          cumulativeAmmount = cumulativeAmmount + content.budget; // "budget" should be altered to actual amount of payment
        } else {
          console.error("cat error", res);
        }
      });
    }
    if (cumulativeAmmount > this.state.budget) {
      this.setState({
        authority: "capable"
      },
      function() {
        console.log("authority: ", this.state.authority);
      });
    }
    
    // check if the user has already voted
    for (let i=0; i<jurors.length; i++) {
      if(currentUser === jurors[i].juror) {
        this.setState({
          submit: "finish"
        },
        function() {
          console.log("user has already voted!");
        });
      }
    }
  }


  _initData = () => {
    let content = "";
    let thisPtr = this;
    //const ipfsPath = "QmZuzn3HY7qyaomGnFHY6vc2DcBVugeKcxByv5ec8Tf7sU";
    //const ipfsPath = "Qmc7QVumD1dJqNUy7SuEwckP5GKJ5JN4yWZz9dzWZeVJNf";
    //const ipfsPath = "QmPVTzKhBmFyKNNt8g8pdJskDmnt7WetvqCv8YpA1du27F"; //4 jurors (+account 1)
    const ipfsPath = "QmV2DGVBZuZhL8Deg6ZJ1jPhSdfQwvzekGiyZhNepbvViV"; //9 jurors
    ipfs.files.cat(ipfsPath, function(err, res) {
      if (!err) {
        IPFS_DATA = res.toString();
        //load IPFS to web
        content = JSON.parse(IPFS_DATA);
        for (var i = 0; i < content.arguments.length; i++) {
          content.arguments[i]["dec"] = "agree";
        }
        thisPtr.setState({
          ipfsData: content,
          name: content.name,
          description: content.requiredSkills,
          detailSpec: content.spec,
          disputes: content.arguments,
          disputeLength: content.arguments.length,
          jurors: content.jurors
        },
        function() {
          console.log("jurors: ", thisPtr.state.jurors);
        });
      thisPtr._checkAuthority();
      } else {
        console.error("cat error", res);
        alert("cat error");
      }

    });

  };

  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };

  _handleOptionChange = (e, dispute) => {
    var newArray = this.state.disputes;
    var specID = dispute.dispute.spec_ID;
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i]["spec_ID"] == specID) {
        newArray[i]["dec"] = e.target.value;
      }
    }
    //newArray.push("specID");
    this.setState({ disputes: newArray }, function() {
      console.log(this.state.disputes);
    });
  };

  _updateIPFS = (finalResult) => {
    var content = this.state.ipfsData;
    content.jurors = this.state.jurors;
    content.finalResult = finalResult;
    const buffer = Buffer.from(JSON.stringify(content), "utf8"); // text string to Buffer
    ipfs.add(buffer, (err, ipfsHash) => {
      const fileAddress = `https://ipfs.io/ipfs/${ipfsHash[0].hash}`;
      console.log(fileAddress);
    });
  };

  _judge = (finalResult) => {
    const { CPL, web3, jurors, disputes } = this.state;
      const chosenJurorNum = 3; //choose 3 jurors
      var candidates = JSON.parse(JSON.stringify(jurors));;
      var chosenJurors = [];
      var chosenResults = []; //[numOfJurors(3)][numOfProblems]
       //[numOfProblems]
      console.log("enough jurors!")
      for (let i=0; i<chosenJurorNum; i++) { 
        var totalTokenFromJurors = 0;
        for (let j=0; j<candidates.length; j++) {
          totalTokenFromJurors = totalTokenFromJurors + candidates[j].tokenNum;
        }
        //TODO: call random function from smart contract
        //var chosenNum = CPL.getRandNum(totalTokenFromJurors)
        //(test: 5, 45 , 85 are chosen)
        var chosenNum = i*40+5;
        var addUpToken = candidates[0].tokenNum;
        var nextCandidate = 1;
        var decArray = [];
        while (addUpToken < chosenNum) {
          addUpToken = addUpToken + candidates[nextCandidate++].tokenNum;
        }
        chosenJurors.push(candidates[nextCandidate-1].juror);
        for(let j=0; j<disputes.length; j++) {
          if (candidates[nextCandidate-1].voteCondition[j] == "agree") {
            decArray.push(1);
          }else {
            decArray.push(0);
          }
        }
        chosenResults.push(decArray);
        candidates.splice(nextCandidate-1, 1);
      }
      console.log("chosen jurors: ", chosenJurors);
      console.log("chosen results: ", chosenResults);

      //get final voting result
      for(let i=0; i<disputes.length; i++) {
        var decTmp = 0;
        for(let j=0; j<chosenJurorNum; j++) {
          decTmp += chosenResults[j][i]
        }
        if (decTmp > chosenJurorNum/2){
          finalResult.push("agree");
        }else {
          finalResult.push("disagree");
        }
      }
      console.log("final result: ", finalResult);

      //TODO: terminate smart contract (props)


      return finalResult;
  };

  _handleChange = (e) => {
    this.setState({ tokenNum: e.target.value });
  };

  _submit = () => {
    //check token num
    if (this.state.tokenNum <= this.state.balance && this.state.tokenNum > 0) {
      //edit polling condition
      var choices = [];
      var tmpArray = {};

      for (var i = 0; i < this.state.disputes.length; i++) {
        if (this.state.disputes[i]["dec"] == "agree") {
          choices.push("agree");
        }
        else {
          choices.push("disagree");
        }
      }
      var newArray = this.state.jurors;
      if (newArray.length == 0) {
        newArray = new Array();
      }

      tmpArray["juror"] = this.state.currentUser;
      tmpArray["tokenNum"] = this.state.tokenNum;
      tmpArray["voteCondition"] = choices;

      newArray.push(tmpArray);

      this.setState(
        {
          jurors: newArray,
          submit: "finish"
        },
        function() {
          console.log(this.state.jurors);
        }
      );

      // check if there are already enough jurors
      const numOfJurors = this.state.jurors.length;
      var finalResult = [];
      if (numOfJurors >= 10) {  //enough jurors
        finalResult = this._judge(finalResult);
      }

      // check if token is less than balance and greater than 0
      console.log("tokenNum: ", this.state.tokenNum);
      console.log("balance: ", this.state.balance);
      
      //upload IPFS
      this._updateIPFS(finalResult);

      //TODO: add IPFS to contract(props)

      //TODO: transfer token to our address

    }
    else {
      alert("token should be greater than 0 and less than balance");
    }
  };
  render() {
    return (
      <Container>
        <Back2BrowseBtn
          onClick={() => this.props.history.push("/dashboard/court/browse")}
        >
          {" "}&lt; Back to Browse
        </Back2BrowseBtn>
        <Block>
          <ProjectName>
            {" "}{this.state.name}{" "}
          </ProjectName>
          <Label>
            {" "}{this.state.description}{" "}
          </Label>
        </Block>

        <Title>Task Requirement</Title>
        <Block>
          <Subject>Detail specification</Subject>
          <Label>
            {this.state.detailSpec}
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
            {this.state.disputes.map((dispute, key) =>
              <DisputeInnerContainer key={key}>
                <SpecIDBlock>
                  <Label>
                    #{dispute.spec_ID}
                  </Label>
                </SpecIDBlock>
                <ArgumentBlock>
                  <Label>
                    {dispute.argument}
                  </Label>
                </ArgumentBlock>
                <JudgementBlock>
                  <Label>
                    <input
                      type="radio"
                      value="agree"
                      checked={dispute.dec === "agree"}
                      onChange={e => this._handleOptionChange(e, { dispute })}
                      style={{ marginRight: "8px" }}
                    />
                    Reasonable
                  </Label>
                  <Label>
                    <input
                      type="radio"
                      value="disagree"
                      checked={dispute.dec === "disagree"}
                      onChange={e => this._handleOptionChange(e, { dispute })}
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
        <Block />
        Token: <input type='text' value={this.state.tokenNum} onChange={this._handleChange} />
        <SubmitBtn
          onClick={this._submit}
          disabled={this.state.submit === "finish" }
          //disabled={this.state.submit === "finish" || this.state.authority === "uncapable"}
        >
          Apply
        </SubmitBtn>
      </Container>
    );
  }
}

export default Form;
