import React, { useState } from "react";
import "./css/login.css";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) navigate("/myTrips");
    else alert(result.message);
  };

  return (
    <div id="loginPage">
      <div id="contentLog">
        <div id="loginDiv">
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              placeholder="Email"
            />
            <br />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Password"
            />
            <br />
            <br />
            <button type="submit" disabled={isLoading} id="loginButton">
              {isLoading ? "Registering" : "Register"}
            </button>
          </form>
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
