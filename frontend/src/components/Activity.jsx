import React from "react";
import "../pages/css/activity.css";
const Activity = ({ value, index, onChange }) => {
  return (
    <div>
      <textarea
        name="activity"
        id="activity"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      ></textarea>
    </div>
  );
};

export default Activity;
