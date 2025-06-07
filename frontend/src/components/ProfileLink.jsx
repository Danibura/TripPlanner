import React from "react";
import { Link } from "react-router-dom";
const ProfileLink = () => {
  return (
    <Link to="/profile">
      <div>
        <span
          className="material-symbols-outlined"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "20px",
            borderRadius: "50%",
          }}
        >
          person
        </span>
      </div>
    </Link>
  );
};

export default ProfileLink;
