import React from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    password: "",
  });

  const { register, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      setFormData({ name: "", birthday: "", email: "", password: "" });
      navigate("/");
    } else {
      console.log("Errore");
    }
  };

  return (
    <div id="signupPage">
      <div id="contentSign">
        <div id="signupDiv">
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
              placeholder="Full name"
            />
            <br />
            <br />
            <label>Birthday:</label>
            <br />
            <input
              type="date"
              name="birthday"
              onChange={handleChange}
              value={formData.birthday}
              required
              placeholder="Birthday"
            />
            <br />
            <br />
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering" : "Register"}
            </button>
          </form>
        </div>
        <br />
        <div id="already">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
