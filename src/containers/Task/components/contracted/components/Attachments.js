import React from "react";
import styled from "styled-components";
import Modal from "../../../../../components/Modal";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-direction: column;
`;

const CreateBtn = styled.button`
  outline: 0;
  font-family: Raleway;
  color: #707070;
  font-size: 1.2vmax;
  border: 0px;
  background-color: #fff;
  padding: 8px 0px;
`;

class Attachments extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <CreateBtn>+ Create Attachment</CreateBtn>
        <Modal title="Create Attachment">
          <AttachmentForm />
        </Modal>
      </Container>
    );
  }
}

const SelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 24px;
    margin-right: 12px;
  }
`;

class AttachmentForm extends React.Component {
  render() {
    return (
      <div>
        <SelectionWrapper>
          <img src="/images/icons/attachmentFile.svg" />
          <img src="/images/icons/hyperlink.svg" />
        </SelectionWrapper>
      </div>
    );
  }
}

export default Attachments;
