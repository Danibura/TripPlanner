import React from "react";

const Pfp = ({ num, size, left, name = "" }) => {
  return (
    <div
      id="pfpContainter"
      style={{
        marginLeft: left,
        width: "min-content",
      }}
    >
      <div
        id="pfpWrapper"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          backgroundColor: "transparent",
          border: "2px black solid",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          id="pfp"
          style={{
            backgroundImage: `url("/images/Ape${num}.jpg")`,
            width: size,
            height: size,
            borderRadius: "50%",
            marginLeft: "0px",
          }}
        ></div>
      </div>

      <figcaption
        style={{
          textAlign: "center",
        }}
      >
        {name}
      </figcaption>
    </div>
  );
};

export default Pfp;
