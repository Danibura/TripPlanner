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
      alert("User already existent");
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
              id="signupName"
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
              id="signupBirthday"
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
              id="signupEmail"
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
              id="signupPassword"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Password"
            />
            <br />
            <div id="accept-policy">
              <input type="checkbox" id="accept" required />
              Accept to make your info visible to others
            </div>

            <button type="submit" disabled={isLoading} id="signupButton">
              {isLoading ? "Loading" : "Sign up"}
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
