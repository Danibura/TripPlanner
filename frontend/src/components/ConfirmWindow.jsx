import React from "react";
import "../pages/css/confirm.css";
const ConfirmWindow = ({ removeTrip, setClickedBin }) => {
  const handleYes = () => {
    removeTrip();
    setClickedBin(0);
  };
  return (
    <div id="confirmWindow">
      <h3>Are you sure you want to leave the trip?</h3>
      <div id="yes-no-div">
        <button id="yes" onClick={handleYes}>
          Yes
        </button>
        <button
          id="no"
          onClick={() => {
            setClickedBin(0);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
