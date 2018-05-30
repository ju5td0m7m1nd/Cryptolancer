import React from "react";
import styled from "styled-components";
import getWeb3 from "../../../../utils/getWeb3";
import ipfs from "../../../../utils/ipfs";


const Container = styled.section`
  background-color: #fff;
  border-top: solid 1px #707070;
  width: 100%;
  height: 80%;
  margin-top: 24px;
  padding: 32px;
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

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: #f9f9f9;
  border: solid 1px #707070;
  border-left: solid 10px #f17105;
  flex-direction: row;
`;


const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-direction: column;
`;

const Head = styled.h3`
  font-size: 30px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f17105;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Body = styled.h3`
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const Datetime = styled.h3`
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  color: #969ca0;
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
  border-bottom: solid 1px #bababa;
`;

const CreatBtn = styled.button`
  outline: none;
  color: #4894fc;
  border: 0px;
  background-color: transparent;

  bottom: 0;
`;

const DetailBtn = styled.button`
  width: 15%;
  font-size: 20px;
  font-weight:bold;
  border: 0px;
  background-color: transparent;
  color: #f17105;

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
      requiredSkills: [],
      
    };
  }

  _handleChange = (e, type) => this.setState({ [type]: e.target.value });
  _create = () =>{};



  render() {
    return (
    	<Container>
    		<Wrapper>
				<InputRow>				
					<Input                    
	                    placeholder={"Search tasks"}                      
	                    onChange={e => this._handleChange(e, "search")}
	                />
	                <CreatBtn>+Creare task</CreatBtn>
	                
				</InputRow>
				<Block>
					<Center>
						<Head>Convert website to android and iOS application. </Head>
						<Body>We use reactjs on website, so it will be easy to convert to app if you're familiar with React Native</Body>
						<Datetime>2018/05/12 - 2018/06/24</Datetime>
					</Center>
					<DetailBtn>More Detail> </DetailBtn>
				</Block>
    		</Wrapper>
       	</Container>
    );
  }
}

export default Browse;




