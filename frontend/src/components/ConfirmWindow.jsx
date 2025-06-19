import React from "react";
import "../pages/css/confirm.css";
const ConfirmWindow = ({ message, handleYes, handleNo }) => {
  return (
    <div id="confirmWindow">
      <h3>{message}</h3>
      <div id="yes-no-div">
        <button id="yes" onClick={handleYes}>
          Yes
        </button>
        <button id="no" onClick={() => handleNo()}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
