import React from "react";
import styled from "styled-components";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";
import Task from "./Task";
import { withRouter } from "react-router";

const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
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

const CreatBtn = styled.button`
  outline: none;
  color: #4894fc;
  border: 0px;
  background-color: transparent;

  bottom: 0;
`;

const PROGRESS = {
  basicInfo: ["name", "requiredSkills", "budget", "description"],
  timeline: ["startDate", "endDate"],
  detailSpec: ["spec"],
  submit: []
};

const INPUT_NAME = {
  name: "Name",
  requiredSkills: "Required Skills",
  budget: "Budget",
  description: "Description",
  startDate: "Start date",
  endDate: "End date",
  spec: "Spec"
};

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      validContracts: [],
      loading: true
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
          contracts.push(await CPL.getContract.call(issuer, i));
        }
        return contracts;
      })
    );
    const ipfss = requests.map(contract => contract.map(c => c));
    const validContracts = [];
    // read ipfs files
    let counter = 0;
    ipfss.map(i => {
      ipfs.files.cat(i.toString(), (err, res) => {
        if (!err) {
          const IPFS_DATA = res.toString();
          //load IPFS to web
          const content = JSON.parse(IPFS_DATA);
          if (content.status === 0) {
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
    this.setState({ loading: true });
  };
  _handleChange = (e, type) => this.setState({ [type]: e.target.value });
  _create = () => {
    this.props.history.push("/dashboard/task/create");
  };

  _routeDetail = path => this.props.history.push(`/dashboard/task/browse/${path}`);

  render() {
    const { validContracts, loading } = this.state;
    return (
      <Container>
        <Wrapper>
          <InputRow>
            <Input
              placeholder={"Search tasks"}
              onChange={e => this._handleChange(e, "search")}
            />
            <CreatBtn onClick={this._create}> + Creare task</CreatBtn>
          </InputRow>
          {loading ? <h3>loading</h3> : null}
          {validContracts.map((contract, key) =>
            <Task
              contract={contract}
              routeDetail={this._routeDetail}
              key={contract.ipfs}
            />
          )}
        </Wrapper>
      </Container>
    );
  }
}

export default withRouter(Browse);
