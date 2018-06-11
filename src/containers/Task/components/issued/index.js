import React from "react";
import styled from "styled-components";
import StatusContainer from "./components/StatusContainer";
import ipfs from "../../../../utils/ipfs";
import firebase from "../../../../utils/firebase";
/*
  statusId status
  0        Waiting Talented
  1        Under Construction
  2        Reviewing
  3        Finished
  4        Denied, select jurors for abritration
  5        Arbitration done
*/

const mockData = [
  {
    name: "Frank",
    status: 0
  },
  {
    name: "Frank",
    status: 1
  },
  {
    name: "Frank",
    status: 2
  },
  {
    name: "Frank",
    status: 3
  },
  {
    name: "Frank",
    status: 4
  },
  {
    name: "Frank",
    status: 5
  }
];

class Ongoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validContracts: [],
      loading: true,
      empty: true
    };
  }

  async componentDidMount() {
    if (this.props.CPL) {
      await this._getAllTask();
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
          validContracts.push({ ...content, ipfs: i });
        } else {
          console.log(err);
        }
        counter++;
        if (counter === ipfss.length) {
          this.setState({
            validContracts: validContracts.filter(
              c => c.issuer === web3.eth.accounts[0]
            ),
            loading: false
          });
        }
      });
    });
    this.setState({
      loading: ipfss.length > 0 ? true : false
    });
  };
  render() {
    const { validContracts } = this.state;
    const { CPL, web3 } = this.props;
    console.log(validContracts);
    return (
      <div>
        {validContracts.map((d, key) =>
          <StatusContainer contract={d} key={key} CPL={CPL} web3={web3} />
        )}
      </div>
    );
  }
}

export default Ongoing;
