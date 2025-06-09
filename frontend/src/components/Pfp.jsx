import React from "react";

const Pfp = ({ num, size }) => {
  return (
    <div
      id="pfp"
      style={{
        backgroundImage: `url("/images/Ape${num}.jpg")`,
        width: size,
        height: size,
        borderRadius: "50%",
        marginLeft: "-20px",
      }}
    ></div>
  );
};

export default Pfp;
