import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: solid 1px #707070;
  border-left: solid 10px #f17105;
  flex-direction: row;
  margin-top: 20px;
`;

const Spec = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  background-color: #fff;
  flex-direction: row;
  margin-bottom: 2%;
`;


const Context = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: #fff;
  border: solid 1px #707070;
  flex-direction: column;
  padding: 5%;
  `;

 const Lancer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  flex-direction: row;
  margin-top: 5%;
  margin-bottom: 5%;
  border-bottom: solid 1px #707070 ;
  `;

const Center = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 5%;
`;

const Person = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const HeadBody = styled.h3`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  color: #707070;
  `;

const Finish = styled.h3`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  color: #23702f;
  `;


const Body = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  color: #707070;
  margin-left: 10px;
`;

const Percent = styled.h3`
  width: 5%;
  font-size: 25px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #303030;
  margin-left: 10px;
  margin-bottom: 1%;

`;

const PercentBody = styled.h3`
  width: 85%;
  font-size: 25px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left; 
  color: #303030;
  margin-bottom: 1%;
  `;

const Close = styled.h3`
  font-size: 25px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left; 
  color: #303030;
  margin-bottom: 1%;
  `;

const Address = styled.h3`
  font-size: 25px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #4894fc;
  margin-bottom: 1%;
  `;

const Name = styled.h3`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
  color: #707070;
  margin-left: 10px;
`;

const Datetime = styled.h3`
  font-size: 1.2vmax;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  color: #969ca0;
`;
const PhotoWrapper = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 80%;
    margin-bottom: 25px;
  }
  margin-left: 20px;
`;

const InfoBtn = styled.button`
  width: 20%;
  font-size: 1.2vmax;
  font-weight: bold;
  border: 0px;
  background-color: transparent;
  color: #909090;
  outline: none;
  margin-bottom: 35px;
`;

const AcceptBtn = styled.button`
  width: 15%;
  font-size: 20px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  align-items:center;
  color: #ffffff;
  background-color: #6610f2;
  border: 0px;
  outline: none;
  margin-right: 1%;
  padding: 10px 16px;
`;

const SubmitBtn = styled.button`
  width: 30%;
  font-size: 20px;
  font-weight: 500;
  font-family: Raleway;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  align-items:center;
  color: #ffffff;
  background-color: #6610f2;
  border: 0px;
  outline: none;
  margin-left: 70%;
  padding: 20px 16px;
  `;

const Decline = styled.h3`
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #707070;
`;


const Reason = styled.h3`
  width: 80%;
  height: 80px;
  display: flex;
  align-items: left;
  margin-bottom: 24px;
  background-color: #fff;
  border: solid 1px #707070;
  margin-right:20%;
  padding: 10px;
  `;

const Check = styled.form`
	width: 25%;
	display: flex;
	color: #6610f2;
	font-size: 18px;
	justify-content: space-between;
	`;


class Ongoing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
    	<Container>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<HeadBody> — Waiting Talented </HeadBody>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
			    <Lancer>
					<PhotoWrapper>
						<img src="/images/dispute.svg"/>
					</PhotoWrapper>
					<Person>
						<Name>Jack</Name>
						<Body>Experienced freelancer with various types of products included web, app, chatbot.</Body>
					</Person>
					<AcceptBtn>Accept</AcceptBtn>
				</Lancer>
    			<Lancer>
    					<PhotoWrapper>
							<img src="/images/dispute.svg"/>
						</PhotoWrapper>
    					<Person>
    						<Name>Jack</Name>
    						<Body>Experienced freelancer with various types of products included web, app, chatbot.</Body>
    					</Person>
    					<AcceptBtn>Accept</AcceptBtn>
    			</Lancer>
    		</Context>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<HeadBody> — Under construction </HeadBody>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
    			Waiting for submit
    		</Context>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<HeadBody> — Reviewing </HeadBody>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
    			<Lancer>
	    			<Spec>
	    				<Percent> 50% </Percent>
	    				<Center>
	    					<PercentBody> 1. A user interface based on our design</PercentBody>
	    				</Center>
	    				<InfoBtn>checkbox</InfoBtn>
	    			</Spec>	    							
    			</Lancer>
    			<Lancer>
	    			<Spec>
	    				<Percent> 15% </Percent>
	    				<Center>
		    				<PercentBody> 2. Login with facebook and email.</PercentBody>
		    				<Decline>Decline Reason</Decline>
		    				<Reason>Facebook login didn't get all fields we required.</Reason>
	    				</Center>
	    				<InfoBtn>checkbox</InfoBtn>
	    			</Spec>
    			</Lancer>
    			<Lancer>
	    			<Spec>
	    				<Percent> 20% </Percent>
	    				<Center>
	    					<PercentBody>3. Same visualization based on our current website.</PercentBody>
	    				</Center>
	    				<Check>
	    					<input type='checkbox' name="s1" value='Accept'/> Accept
	    					<input type='checkbox' name="s1" value='Decline'/> Decline
	    				</Check>
	    			</Spec>	    							
    			</Lancer>
    			<Lancer>
	    			<Spec>
	    				<Percent> 15% </Percent>
	    				<Center>
	    					<PercentBody>4. Integrate with behavior analytics plugin (ex. GA )</PercentBody>
	    				</Center>
	    				<Check>
	    					<input type='checkbox' name="s1" value='Accept'/> Accept
	    					<input type='checkbox' name="s1" value='Decline'/> Decline
	    				</Check>
	    			</Spec>	    							
    			</Lancer>
    			<SubmitBtn>Submit Review</SubmitBtn>
    		</Context>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<Finish> — Finish </Finish>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
    			<PercentBody>Project done, payment transfered.</PercentBody>
    			<Spec>
  					<Close>Transaction Address:&nbsp;</Close>
  					<Address>0x36db46d0c5a45fe0ea35419f7d1f8104980ede7d</Address>
  				</Spec>
    		</Context>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<HeadBody> — Denied, select jurors for arbitration </HeadBody>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
    			<Spec>
  					<Close>Checkout&nbsp;</Close>
  					<Address> here </Address>
  					<Close>&nbsp;for arbitration progress.</Close>
  				</Spec>
    		</Context>
    		<Block>
    			<Center>
    				<Head> Convert website to android and iOS application. </Head>
    				<HeadBody> — Arbitration done </HeadBody>
    			</Center>
    			<InfoBtn> project info !</InfoBtn>
    		</Block>
    		<Context>
    			<Spec>
  					<Close>Checkout&nbsp;</Close>
  					<Address> here </Address>
  					<Close>&nbsp;for arbitration progress.</Close>
  				</Spec>
    		</Context>
    	</Container>
    );
  }
}

export default Ongoing;
