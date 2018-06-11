import React from "react";

export default () =>
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(30, 30, 30, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999
    }}
  >
    <div
      style={{
        width: "50%",
        height: "30%",
        border: "2px solid #6528EE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 2px 6px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          color: "#303030"
        }}
      >
        Smart Contract Executing, Please wait :)
      </h3>
    </div>
  </div>;
