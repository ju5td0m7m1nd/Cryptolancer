import React from "react";
import styled from "styled-components";
import Dispute from "./Dispute";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validContracts: []
    };
  }

  componentDidMount() {
    if (this.props.CPL) {
      this._getAllTask();
    }
  }
  _getAllTask = async () => {
    const { CPL, web3 } = this.props;

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
      ipfs.files.cat(i.toString(), (err, res) => {
        if (!err) {
          const IPFS_DATA = res.toString();
          //load IPFS to web
          const content = JSON.parse(IPFS_DATA);
          if (content.status === 4 && content.disputes.length > 0) {
            validContracts.push({ ...content, ipfs: i });
          }
        } else {
          console.log(err);
        }
        counter++;
        if (counter === ipfss.length) {
          this.setState({ validContracts, loading: false });
        }
      });
    });
    this.setState({
      loading: ipfss.length > 0 ? true : false
    });
  };
  render() {
    const { validContracts } = this.state;
    return (
      <Container>
        {validContracts.map((c, key) => <Dispute key={key} contract={c} />)}
      </Container>
    );
  }
}

export default Browse;
