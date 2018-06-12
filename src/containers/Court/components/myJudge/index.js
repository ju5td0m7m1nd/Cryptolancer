import React from "react";
import styled from "styled-components";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";
import { CPLInstance } from "../../../../utils/getContract";
import { CPTInstance } from "../../../../utils/getTokenContract";

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
  width: 80%;
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
  align-items: center;
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
  font-size: 1.0vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  width: 100%;
  margin-top: 0.5em;
`;

const RedLabel = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #D11149;
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
  font-size: 1.5vmax;
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

const Spec = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  p {
    font-size: 1.0vmax;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
`;

const Back2HistoryBtn = styled.button`
  font-size: 20px;
  outline: none;
  color: #d11149;
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
    console.log("props: ", props);
    this.state = {
      CPL: null,
      CPT: null,
      web3: null,
      ipfs: this.props.match.params.ipfs,
      currentUser: "testUser",
      name: "<test> Convert website to android and iOS application",
      description:
        "<test> We use reactjs on website so it will be easy to convert to app if you're familiar with React Native",
      detailSpec: [
        {"text":"<test>","partition":"30"},
        {"text":"<test>","partition":"60"},
        {"text":"<test>","partition":"10"}
      ],
      disputes: [""],
      userIdx: 0,
      userDec: null,
      contract: null,
      attachments: [
        {
          "type":"hyperlink",
          "value":"https://<test>workuniverse.co"
        }
      ],
      finalResult: [],
      applyingFlag: false,
      chosenJurorFlag: false
    };
  }

  async componentDidMount() {
    const CPL = await CPLInstance();
    const CPT = await CPTInstance();
    const web3 = (await getWeb3).web3;
    this.setState(
      { 
        CPL: CPL, 
        CPT: CPT,
        web3: web3,
        // currentUser: "0xb019c765614a6c549f9958618949417c58af3401"
        currentUser: web3.eth.accounts[0]
      },
      function() {
        
      }
    );
    this._initData(CPL, web3);
  }


  _initData = () => {
    let content = "";
    let thisPtr = this;
    var ipfsPath = this.state.ipfs;
    ipfs.files.cat(ipfsPath, function(err, res) {
      if (!err) {
        IPFS_DATA = res.toString();
        //load IPFS to web
        content = JSON.parse(IPFS_DATA);
        var userIdx = 0
        var userDec = [];
        var chosenJurorFlag = false;
        var applyingFlag = false;
        for(let i=0; i<content.jurorApplicant.length; i++) {
          if(content.jurorApplicant[i].address == thisPtr.state.currentUser) {
            userIdx = i;
            if(content.jurors !=null){
              for(let j=0; j<content.jurors.length; j++) {
                if(thisPtr.state.currentUser == content.jurors[j])  chosenJurorFlag = true;
              }
            } else {
              applyingFlag = true;
            }
          }
        }
        
        for(let i=0; i<content.disputes.length; i++) {
          content.disputes[i].userDec = content.jurorApplicant[userIdx].judgements[i].judgement;
        }
        thisPtr.setState({
          contract: content,
          userIdx: userIdx,
          name: content.name,
          description: content.description,
          detailSpec: content.detailspec,
          disputes: content.disputes,
          attachments: content.attachments,
          finalResult: content.finalResult,
          chosenJurorFlag: chosenJurorFlag,
          applyingFlag: applyingFlag

        }, function () {
          
        });
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

  render() {
    return (
      <Container>
        <Back2HistoryBtn
          onClick={() => this.props.history.push("/dashboard/court/history")}
        >
          {" "}&lt; Back to History
        </Back2HistoryBtn>
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
            {this.state.detailSpec.map((s, key) =>
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
            </JudgementBlock>
            {this.state.finalResult!=null
            ? <JudgementBlock>
                <Label>Final Result</Label>
              </JudgementBlock>
            : null
            }
          </DisputeInnerContainer>
          <Line />
          <Label>
            {this.state.disputes.map((dispute, key) =>
              <DisputeInnerContainer key={key}>
                <SpecIDBlock>
                  <Label>
                    #{dispute.specId}
                  </Label>
                </SpecIDBlock>
                <ArgumentBlock>
                  <Label>
                    {dispute.argument}
                  </Label>
                </ArgumentBlock>
                <JudgementBlock>
                  {dispute.userDec === true ? 
                    <RedLabel>V</RedLabel>
                    : <RedLabel>X</RedLabel>
                  }
                </JudgementBlock>
                {this.state.finalResult != null
                  ? this.state.finalResult[key] == 1
                    ? <JudgementBlock>
                        <Label>Reasonable</Label>
                      </JudgementBlock>
                    : <JudgementBlock>
                        <Label>Not Convincible</Label>
                      </JudgementBlock>
                  : null
                }
              </DisputeInnerContainer>
            )}
          </Label>
          <Hr />
          {this.state.applyingFlag == false 
            ? this.state.chosenJurorFlag == true
              ? <RedLabel>You are chosen as the juror</RedLabel>
              : <RedLabel>You are not chosen as the juror</RedLabel>
            : <RedLabel>Waiting for more jurors</RedLabel>
          }
        </Block>
        <Title>Attachment</Title>
        <Block>
        {this.state.attachments.map(
          (a, key) =>
            a.type === "hyperlink"
              ? <a href={a.value} key={key}>
                  {a.value}
                </a>
              : null
          )}
        </Block>
      </Container>
    );
  }
}

export default Form;
