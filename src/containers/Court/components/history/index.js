import React from "react";
import styled from "styled-components";
import StatusContainer from "./components/StatusContainer";
import ipfs from "../../../../utils/ipfs";
import firebase from "../../../../utils/firebase";
import Mask from "../../../../components/Mask";
import { withRouter } from "react-router";
/*
  state status
  0        Picking Jurors
  1        Selected
  2        Not Selected
*/

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 80%;
  position: relative;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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
  width: 30%;
  border-bottom: solid 2px #707070;
  font-weight: 500;
  font-style: italic;
`;



class Record extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      validContracts: [],
      loading: true,
      empty: true,
      mask: false,
      CPL: null,
      CPT: null,
      web3: null
    };
  }

  async componentDidMount() {
    const { CPL, web3, CPT } = this.props;
    await this.setState(
      { 
        CPL: CPL, 
        CPT: CPT,
        web3: web3
      }
    ), function () {
      console.log("state: ", this.state);
    };
    if (this.state.CPL) {
      await this._getAllTask();
    }
  }

  _onLoading = () => this.setState({ mask: true });
  _endLoading = () => this.setState({ mask: false });

  _routeMyJudge = path =>
    this.props.history.push(`/dashboard/court/record/${path}`);
    _getAllTask = async () => {
      const { CPL, web3 } = this.state;
      var user = web3.eth.accounts[0];
      // get issuers count
      const issuersCount = web3.toDecimal(await CPL.getAllContractCount.call());
      // get all issuers
      const issuers = [];
      for (let i = 0; i < issuersCount; i++) {
        issuers.push(await CPL.getIssuerWithIndex.call(i));
      }
      const requests = await Promise.all(
        issuers.map(async issuer => {
          const contracts = [];
          const projectCount = web3.toDecimal(
            await CPL.getContractCount.call(issuer)
          );
  
          for (let i = 0; i < projectCount; i++) {
            const r = await CPL.getContract.call(issuer, i);
            contracts.push(r[0]);
          }
          return contracts;
        })
      );
      const ipfss = requests.reduce((pre, cur) => {
        return pre.concat(cur);
      }, []);
      const validContracts = [];
  
      // read ipfs files
      let counter = 0;
      ipfss.map(i => {
        //var testIPFS = "QmP8aMCxotVkAy1RB9AucXyRQALxjeCMsVAfSq5zTeUxTf"; //no juror
        var testIPFS = "QmTf9WYyw8jY5fsjc3Vuu2SZo4iuxQMRA5ZwxbTHf2GaQm"; //arbitratin done
        //var testIPFS = "QmUisbf6joTnWWykCU87CLaiHpF1zTVUWKJASyq2wJL1c8" //applying
  
        //var testUser = "0xd471b6365ce2c065dda6634f383bc3b6bd7d70aa"; // chosenJuror
        var testUser = "0xb019c765614a6c549f9958618949417c58af3401"; //unchosenJuror
        //var testUser = "0x7c365ca29143292fd64a4e02f8aa213db49e6b19"; //false false
        //var testUser = web3.eth.accounts[0] // not juror

        user = testUser;
  
        //ipfs.files.cat(i.toString(), (err, res) => {
        ipfs.files.cat(testIPFS, (err, res) => {
          if (!err) {
            const IPFS_DATA = res.toString();
            //load IPFS to web
            const content = JSON.parse(IPFS_DATA);
            if(content.jurorApplicant != null){
              for(let i=0; i<content.jurorApplicant.length; i++){
                if(content.jurorApplicant[i].address == user) {
                  if(content.jurors != null) {
                    var chosenFlag = 0;
                    for(let j=0; j<content.jurors.length; j++) {
                      if(content.jurors[j] == user) {
                        chosenFlag = 1;
                      }
                    }
                    if(chosenFlag==1) {
                      validContracts.push({ ...content, ipfs: testIPFS, type: 1 });
                    } else{
                      validContracts.push({ ...content, ipfs: testIPFS, type: 2 });
                    }
                  } else {
                    validContracts.push({ ...content, ipfs: testIPFS, type: 0 ,jurorOrder: i});
                  }
                }
              }
            }
          } else {
            console.log(err);
          }
          counter++;
          if (counter === ipfss.length) {
            this.setState({
              validContracts: validContracts,
              loading: false
            },
            function() {
            });
          }
        });
      });
      this.setState({
        loading: ipfss.length > 0 ? true : false
      });
    };

  _handleChange = (e, type) => this.setState({ [type]: e.target.value });

  render() {
    const { validContracts, mask, CPL, web3, CPT } = this.state;
    return (
      <Container>
        <Wrapper>
          <InputRow>
            <Input
              placeholder={"Search disputes"}
              onChange={e => this._handleChange(e, "search")}
            />
          </InputRow>
          {mask ? <Mask /> : null}
          {validContracts.map((d, key) =>
          <StatusContainer
            contract={d}
            key={key}
            CPL={CPL}
            web3={web3}
            CPT={CPT}
            onLoading={this._onLoading}
            endLoading={this._endLoading}
            routeMyJudge={this._routeMyJudge}
            user={web3.eth.accounts[0]}
            // user = "0xd471b6365ce2c065dda6634f383bc3b6bd7d70aa"
          />
          )}
        </Wrapper>
      </Container>
    );
  }
}
export default withRouter(Record);
