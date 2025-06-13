import React from "react";
import "../pages/css/userLine.css";
import Pfp from "./Pfp";

const UserLine = ({ user, setShowProfile }) => {
  return (
    <div id="userLine" onClick={() => setShowProfile(user)}>
      <Pfp size={50} user={user} left={50} />
      <div id="userLine-name">{user.name}</div>
    </div>
  );
};

export default UserLine;
