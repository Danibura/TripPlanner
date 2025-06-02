import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTripStore } from "../store/trip";
import "./css/join.css";
const JoinPage = () => {
  var [tripCode, setTripCode] = useState();

  return (
    <div id="joinPage">
      <div id="content">
        <div id="title"> Insert access code:</div>
        <div id="row">
          <textarea
            name="codeArea"
            id="codeArea"
            onChange={(e) => setTripCode(e.target.value)}
          ></textarea>

          <Link to={`/create/${tripCode}`}>
            <button id="go">GO</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
