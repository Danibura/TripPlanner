import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeLink from "../components/HomeLink";
import "./css/join.css";
const JoinPage = () => {
  var [tripCode, setTripCode] = useState();
  const isMobile = window.innerWidth < 600;
  return (
    <div id="joinPage">
      {!isMobile && <HomeLink />}
      <div id="content">
        <div id="title"> Insert access code:</div>
        <div id="row">
          <div id="codeArea">
            <textarea
              name="code"
              id="code"
              onChange={(e) => setTripCode(e.target.value)}
            ></textarea>
          </div>

          <Link to={`/create/${tripCode}`}>
            <button id="go">GO</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
