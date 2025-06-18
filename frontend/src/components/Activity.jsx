import React from "react";
import "../pages/css/activity.css";
import { useState } from "react";
const Activity = ({ value, index, onChange, handleDeleteActivity }) => {
  const [textActivity, setTextActivity] = useState(value);
  return (
    <div id="activity">
      <textarea
        name="activity-text"
        id="activity-text"
        value={value}
        onChange={(e) => {
          onChange(index, e.target.value);
          setTextActivity(e.target.value);
        }}
      ></textarea>
      <button
        className="material-symbols-outlined"
        id="activity-delete"
        onClick={() => handleDeleteActivity(textActivity)}
      >
        delete_forever
      </button>
    </div>
  );
};

export default Activity;
