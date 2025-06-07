import React from "react";
import { Link } from "react-router-dom";
import ProfileLink from "../components/ProfileLink";
import "./css/home.css";

const HomePage = () => {
  var tripCode = parseInt(Math.random() * 100000000);
  return (
    <div className="column">
      <ProfileLink />
      <Link to={`/create/${tripCode}`}>
        <button id="createButton">Create a trip</button>
      </Link>
      <br />
      <Link to="/join">
        <button id="joinButton">Join a trip</button>
      </Link>
    </div>
  );
};

export default HomePage;
