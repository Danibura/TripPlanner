import React from "react";
import { Link } from "react-router-dom";
const HomeLink = () => {
  return (
    <Link to="/myTrips">
      <div>
        <span
          className="material-symbols-outlined"
          style={{
            color: "#fff",
            background:
              "linear-gradient(rgb(37, 123, 173), rgb(141, 215, 233), rgb(37, 123, 173))",
            paddingLeft: "40px",
            paddingTop: "10px",
            paddingBottom: "10px",
            width: "80px",
            fontSize: "40px",
            position: "absolute",
            left: "900px",
            top: "0px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            border: "2px solid white",
            borderTop: "0px",
          }}
        >
          home
        </span>
      </div>
    </Link>
  );
};

export default HomeLink;
