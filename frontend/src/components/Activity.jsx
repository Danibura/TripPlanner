import React from "react";

const Activity = ({ value, index, onChange }) => {
  return (
    <div>
      <textarea
        name="activity"
        id="activity"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        style={{
          backgroundColor: "fff",
          borderRadius: "10px",
          padding: "10px",
          marginBottom: "15px",
          width: "600px",
        }}
      ></textarea>
    </div>
  );
};

export default Activity;
