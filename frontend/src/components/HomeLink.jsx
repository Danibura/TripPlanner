import React from "react";
import { Link } from "react-router-dom";
const HomeLink = () => {
  return (
    <Link to="/">
      <div>
        <span
          class="material-symbols-outlined"
          style={{
            color: "#fff",
            background:
              "linear-gradient(rgb(255, 2, 2), rgb(255, 125, 3), rgb(255, 208, 0))",
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
