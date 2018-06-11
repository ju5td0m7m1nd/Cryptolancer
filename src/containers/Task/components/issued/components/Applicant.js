import React from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import Mask from "../../../../../components/Mask";
import firebase from "../../../../../utils/firebase";
import { readIPFS, createIPFS } from "../../../../../utils/ipfs";
const Container = styled.div`
  width: 90%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #707070;
`;
const Profile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 60%;
  img {
    width: 64px;
    height: 64px;
    margin-right: 24px;
    border-radius: 50%;
    border: 1px solid #707070;
  }
  div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    h3 {
      font-size: 1.2vmax;
      font-family: Raleway;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      text-align: left;
      color: #707070;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 1vmax;
      font-family: Raleway;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      text-align: left;
      color: #707070;
    }
  }
`;

const AcceptBtn = styled.div``;

class Applicant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mask: false
    };
  }
  componentDidMount() {
    const { address } = this.props;
    this._getUserInfo(address);
  }
  _getUserInfo = async address => {
    firebase.database().ref(`/users/${address}`).once("value", snapShot => {
      console.log(snapShot.val());
    });
  };

  _assignContractor = async () => {
    const { ipfs, address, CPL, web3 } = this.props;
    this.setState({ mask: true });
    await CPL.assignContract(address, ipfs, { from: web3.eth.accounts[0] });
    const data = await readIPFS(ipfs);
    const newData = Object.assign({}, data, { contractor: address, status: 1 });
    const newIPFSHash = await createIPFS(newData);
    await CPL.updateContractFromOwner(ipfs, newIPFSHash, {
      from: web3.eth.accounts[0]
    });
    window.location.reload();
  };

  render() {
    return (
      <Container>
        {this.state.mask ? <Mask /> : null}
        <Profile>
          <img />
          <div style={{ width: "70%" }}>
            <h3>Frank</h3>
            <h4>
              Experienced freelancer with various types of products included
              web, app, chatbot.
            </h4>
          </div>
        </Profile>
        <Button
          text="Accept"
          style={{
            backgroundColor: "#6610F2",
            fontSize: "1.2vmax",
            fontWeight: "lighter",
            border: "0px"
          }}
          onClick={this._assignContractor}
        />
      </Container>
    );
  }
}

export default Applicant;
