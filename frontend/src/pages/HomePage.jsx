import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  var tripCode = parseInt(Math.random() * 100000000);
  return (
    <div className="column">
      <Link to={`/create/${tripCode}`}>
        <button className="create">Create a trip</button>
      </Link>
      <br />
      <Link to="/join">
        <button className="join">Join a trip</button>
      </Link>
    </div>
  );
};

export default HomePage;
