import React from "react";
import ProfilePage from "../pages/ProfilePage";
import { Link } from "react-router-dom";
import "../pages/css/pfp.css";
const Pfp = ({
  user = null,
  size,
  left,
  color = "transparent",
  name = "",
  onClick = {},
}) => {
  const content = (
    <div
      id="profileContainer"
      style={{
        marginLeft: left,
        width: "min-content",
      }}
      onClick={onClick}
    >
      <div
        id="pfpWrapper"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          backgroundColor: "transparent",
          border: "2px solid",
          borderColor: color,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          id="pfp"
          style={{
            backgroundImage: `url("/images/Ape${user.pfp}.jpg")`,
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
  return (
    <Link
      to={"/profile"}
      style={{
        textDecoration: "none",
        color: "rgb(30,30,30)",
      }}
    >
      {content}
    </Link>
  );
};

export default Pfp;
