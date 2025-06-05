import React from "react";
import "./css/login.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div id="loginPage">
      <div id="contentLog">
        <div id="loginDiv">
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" name="email" />
          <br />
          <br />
          <label htmlFor="email">Password:</label>
          <br />
          <input type="password" name="password" />
          <br />
          <br />
          <button id="loginButton">Login</button>
        </div>
        <br />
        <div id="dont">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
