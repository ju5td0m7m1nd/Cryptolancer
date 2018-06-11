import React from "react";
import styled from "styled-components";
import Modal from "../../../../../components/Modal";
import Button from "../../../../../components/Button";
import Mask from "../../../../../components/Mask";
import { readIPFS, createIPFS } from "../../../../../utils/ipfs";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
`;

const CreateBtn = styled.button`
  outline: 0;
  font-family: Raleway;
  color: #707070;
  font-size: 1.2vmax;
  border: 0px;
  background-color: #fff;
  padding: 8px 0px;
  margin-bottom: 12px;
`;

const Attachment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 1.5vmax;
    margin-right: 12px;
  }
  h3 {
    font-size: 1.5vmax;
    color: #707070;
  }
`;
class Attachments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      modal: false,
      mask: false
    };
  }

  _attach = attachment => {
    this.setState({
      attachments: this.state.attachments.concat(attachment),
      modal: false
    });
  };

  _openModal = () => this.setState({ modal: true });
  _closeModal = () => this.setState({ modal: false });
  _submit = async () => {
    const { attachments } = this.state;
    const { contract, CPL, web3 } = this.props;
    if (attachments.length > 0) {
      const attachmentsData = attachments.map(a => ({
        type: a.type,
        value: a.type === "hyperlink" ? a.link : a.file
      }));

      this.setState({ mask: true });
      const newPayload = Object.assign({}, this.props.contract, {
        attachments: attachmentsData,
        status: parseInt(contract.status, 10) + 1
      });
      const newIPFSHash = await createIPFS(newPayload);
      await CPL.updateContractFromFreelancer(contract.ipfs, newIPFSHash, {
        from: web3.eth.accounts[0]
      });
      this.setState({ mask: false }, () => window.location.reload());
    } else {
      window.alert("We need attachments for reviewing");
    }
  };
  render() {
    const { modal, attachments, mask } = this.state;
    return (
      <Container>
        {mask ? <Mask /> : null}
        <CreateBtn onClick={this._openModal}>+ Create Attachment</CreateBtn>
        {attachments.map((a, key) =>
          <Attachment key={key}>
            <img
              src={
                a.type === "hyperlink"
                  ? "/images/icons/hyperlink.svg"
                  : "/images/icons/attachmentFile.svg"
              }
            />
            <h3>
              {a.type === "hyperlink" ? a.link : a.file}
            </h3>
          </Attachment>
        )}
        {modal
          ? <Modal title="Create Attachment" cancel={this._closeModal}>
              <AttachmentForm attach={this._attach} />
            </Modal>
          : null}
        <Button
          style={{
            position: "absolute",
            right: 0,
            bottom: "5%",
            padding: "8px 16px",
            fontSize: "1.2vmax"
          }}
          text="Submit"
          onClick={this._submit}
        />
      </Container>
    );
  }
}

const SelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  img {
    width: 24px;
    margin-right: 12px;
  }
`;

const FileWrapper = styled.div`
  padding: 8px;
  width: 100%;
`;
const HyperlinkInput = styled.input`
  width: 50%;
  padding: 8px;
  font-size: 1.2vmax;
  color: #707070;
  border: 0px;
  border-bottom: 1px solid #303030;
  outline: none;
`;
const FileInput = styled.input`
  padding: 8px;
  font-size: 1.2vmax;
  color: #707070;
  border: 0px;
  border-bottom: 1px solid #303030;
  outline: none;
`;

class AttachmentForm extends React.Component {
  state = {
    type: "hyperlink",
    file: null,
    link: ""
  };
  render() {
    const { type } = this.state;
    return (
      <div
        style={{
          width: "100%",
          height: "90%",
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "5% 0px"
        }}
      >
        <SelectionWrapper>
          <img
            onClick={() => this.setState({ type: "hyperlink" })}
            src={
              type === "hyperlink"
                ? "/images/icons/active/hyperlink.svg"
                : "/images/icons/hyperlink.svg"
            }
          />
          <img
            onClick={() => this.setState({ type: "attachment" })}
            src={
              type === "attachment"
                ? "/images/icons/active/attachment.svg"
                : "/images/icons/attachmentFile.svg"
            }
          />
        </SelectionWrapper>
        <FileWrapper>
          {type === "hyperlink"
            ? <HyperlinkInput
                placeholder="https://..."
                defaultValue={this.state.link}
                onChange={e => this.setState({ link: e.target.value })}
              />
            : <FileInput type="file" />}
        </FileWrapper>
        <Button
          style={{
            position: "absolute",
            right: 0,
            bottom: "5%",
            padding: "8px 16px",
            fontSize: "1.2vmax"
          }}
          text="Attach"
          onClick={() => this.props.attach(this.state)}
        />
      </div>
    );
  }
}

export default Attachments;
