import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4894fc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StraightLine = styled.svg`
  width: 32px;
  height: 32px;
`;

const Icon = styled.img`width: 16px;`;

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { PROGRESS, currentProgress } = this.props;
    return (
      <Container>
        {Object.keys(PROGRESS).map(
          (i, key) =>
            key === 3
              ? <Circle key={key}>
                  {currentProgress === i
                    ? <Icon src="/images/workingInput.svg" />
                    : <Icon />}
                </Circle>
              : <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                  }}
                >
                  <Circle>
                    {currentProgress === i
                      ? <Icon src="/images/workingInput.svg" />
                      : <Icon />}
                  </Circle>
                  <StraightLine>
                    <line
                      x1="16"
                      y1="0"
                      x2="16"
                      y2="32"
                      style={{ stroke: "#4894fc", strokeWidth: 1 }}
                    />
                  </StraightLine>
                </div>
        )}
      </Container>
    );
  }
}

export default ProgressBar;
