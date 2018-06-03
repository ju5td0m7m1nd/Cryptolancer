import React from "react";
import styled from "styled-components";
import TaskSummary from "./TaskSummary";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";

const Container = styled.section`
  background-color: #fff;
  border-top: solid 1px #707070;
  border: solid 1px #707070;
  border-radius: 12px;
  width: 80%;
  height: 80%;
  margin-top: 24px;
  padding: 32px;
  // display: flex;
  // align-items: flex-start;
  // justify-content: space-between;
  
`;

const DisputeContainer = styled.section`
  background-color: #fff;
  border-top: solid 1px #707070;
  border: solid 1px #707070;
  width: 80%;
  height: 80%;
  margin-top: 24px;
  padding: 32px;
  //display: flex;
  //align-items: flex-start;
  //justify-content: space-between;
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


const ProjectName = styled.h1`
  font-size: 20px;
  font-family: Raleway;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  line-height: 1.16;
  text-align: left;
  color: #303030;
  width: 100%;

`;

const Label = styled.h3`
  font-size: 16px;
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
  font-size: 20px;
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
  font-size: 18px;
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

const Input = styled.input`
  font-size: 16px;
  font-weight: lighter;
  text-align: left;
  color: #4894fc;
  padding: 8px;
  background-color: transparent;
  border: 0px;
  outline: none;
  width: 60%;
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
  margin-left: 72%;
  margin-right: auto;
  outline: none;
  font-size: 20px;
  color: #d11149;
  border: 0px;
  background-color: transparent;
  bottom: 0;
  position: relative;
  margin-top: 5em;
  margin-bottom: 10em;

`;

const Hr = styled.hr `
    display: block;
    margin-top: 0.5em;
    margin-bottom: 4em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    color: #707070;
`;
const Line = styled.hr `
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
    //read IPFS    
    var ipfsPath="QmZuzn3HY7qyaomGnFHY6vc2DcBVugeKcxByv5ec8Tf7sU"
    //var ipfsPath="QmfR2Lz38ndu8qv6xXy7oSKC4GnKqN7oLFwyzY4z3Kzwdi"
    this.state = {
      ipfsData: "",
      currentUser: "testUser",
      name: "<test> Convert website to android and iOS application",
      description: "<test> We use reactjs on website so it will be easy to convert to app if you're familiar with React Native",
      detailSpec: "<test> Put it onto App store and GooglePlay.",
      disputes: [""],
      disputeLength: 0,
      submit: "unfinished"
    };
    var content = ""
    var thisPtr = this; 
    ipfs.files.cat(ipfsPath, function(err, res) {
      if(!err){    
        IPFS_DATA = res.toString();  
        //load IPFS to web
        content = JSON.parse(IPFS_DATA);
        for (var i=0; i<content.arguments.length; i++) {
          content.arguments[i]["dec"] = "agree";
        }
        thisPtr.setState({
          ipfsData: content,
          name: content.name,
          description: content.requiredSkills,
          detailSpec: content.spec,
          disputes: content.arguments,
          disputeLength: content.arguments.length
        });
        
      } else {
        alert("ipfs download error");
        console.error('cat error', res);
      }
    });
    
  }
  _autoGrow = e => {
    e.style.height = "10px";
    e.style.height = e.scrollHeight + 20 + "px";
  };


  _handleOptionChange =  (e, dispute) => {
    var newArray = this.state.disputes;
    var specID = dispute.dispute.spec_ID;
    for (var i=0; i<newArray.length; i++){
      if (newArray[i]["spec_ID"] == specID) {
        newArray[i]["dec"] = e.target.value;
      }
    }
    //newArray.push("specID");
    this.setState({disputes:newArray}, function(){ console.log(this.state.disputes) })
  };

  _handleChange = (e, type) => this.setState({ [type]: e.target.value });

  _submit = async () => {
    //edit polling condition
    var newArray = this.state.disputes;
    console.log(this.state.disputes);
    for (var i=0; i<this.state.disputes.length; i++){
      if (this.state.disputes[i]["dec"] == "agree") {
        if (newArray[i]["voteYes"] == null) {
          newArray[i]["voteYes"] = new Array();
        }else {
          newArray[i]["voteYes"] = Array.from(newArray[i]["voteYes"]);
        }
        newArray[i]["voteYes"].push(this.state.currentUser);
      }
      else {
        if (newArray[i]["voteNo"] == null) {
          newArray[i]["voteNo"] = new Array();
        }else {
          newArray[i]["voteNo"] = Array.from(newArray[i]["voteNo"]);
        }
        newArray[i]["voteNo"].push(this.state.currentUser);
      }
    }
    this.setState({
      disputes:newArray,
      submit: "finish"
    }, function(){ console.log(this.state.disputes) })
    
    //upload IPFS

    var content = this.state.ipfsData;
    console.log("ipfsData arguments: ",this.state.ipfsData.arguments)
    console.log("disputes: ", this.state.disputes)
    content.arguments = this.state.disputes;

    const buffer = Buffer.from(JSON.stringify(content), "utf8"); // text string to Buffer
    await ipfs.add(buffer, (err, ipfsHash) => {
      const fileAddress = `https://ipfs.io/ipfs/${ipfsHash[0].hash}`;
      // alert(fileAddress);
      
      
      // TODO add to contract
    });
  
  };
  render() {


    return (
      <div>
      <Back2BrowseBtn> &lt; Back to Browse</Back2BrowseBtn>
      <Container>
          <ProjectName> {this.state.name} </ProjectName>
          <Label> {this.state.description} </Label>
      </Container>

      <Title>Task Requirement</Title>
      <Container>
        <Subject>Detail specification</Subject>
        <Label>{this.state.detailSpec}</Label>
        <Hr></Hr>
        
      </Container>

      <Title>Dispute</Title>
      <DisputeContainer>
        <DisputeInnerContainer>
        <SpecIDBlock>
          <Label>Spec ID</Label>
        </SpecIDBlock>
        <ArgumentBlock>
          <Label>Argument</Label>
        </ArgumentBlock>
        <JudgementBlock>
          <Label>Judgement</Label>
          <RadioBtn></RadioBtn>
        </JudgementBlock>
        </DisputeInnerContainer>
        <Line></Line>
        <Label>
        {
            this.state.disputes.map((dispute) => (
              <DisputeInnerContainer key={dispute.spec_ID}>
                <SpecIDBlock>
                  <Label>#{dispute.spec_ID}</Label>
                </SpecIDBlock>
                <ArgumentBlock>
                  <Label>{dispute.argument}</Label>
                </ArgumentBlock>
                <JudgementBlock>
                  <Label>
                  <input type="radio" value="agree" 
                      checked={dispute.dec === 'agree'} 
                      onChange={e => this._handleOptionChange(e, {dispute})} />
                   Reasonable
                  </Label>
                  <Label>
                  <input type="radio" value="disagree" 
                      checked={dispute.dec === 'disagree'} 
                      onChange={e => this._handleOptionChange(e, {dispute})} />
                   Not Convincible
                  </Label>

                </JudgementBlock>  
              </DisputeInnerContainer>              
            ))
        }
        </Label>
      <Hr></Hr>
      </DisputeContainer>
      <Title>Attachment</Title>
      <Container>
        
      </Container>
      <SubmitBtn onClick={this._submit} disabled={this.state.submit === "finish"}>Submit ></SubmitBtn>
      </div>
      
      
    );
  }
}

export default Form;
