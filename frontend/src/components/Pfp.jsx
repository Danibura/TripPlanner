import React from "react";
import ProfilePage from "../pages/ProfilePage";
import { Link } from "react-router-dom";
import "../pages/css/pfp.css";
const Pfp = ({
  user = null,
  size,
  left = 0,
  right = 0,
  top = 0,
  color = "transparent",
  name = "",
  setShowProfile = () => {},
  isMobile,
  setHideTab = () => {},
}) => {
  const handleShowProfile = () => {
    setShowProfile(user);
    setHideTab(false);
  };
  return (
    <div
      id="profileContainer"
      style={{
        marginLeft: left,
        width: "min-content",
        marginTop: top,
        marginRight: right,
        height: "fit-content",
      }}
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
          cursor: "pointer",
        }}
        onClick={() => handleShowProfile()}
      >
        <div
          id="pfp"
          style={{
            backgroundImage: `url("/images/Ape${user?.pfp}.jpg")`,
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
          fontSize: isMobile ? "3vw" : "",
          lineHeight: isMobile ? "0.8rem" : "",
        }}
      >
        {name}
      </figcaption>
    </div>
  );
};

export default Pfp;
