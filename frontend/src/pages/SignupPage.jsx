import React from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
    } catch (err) {}
  };

  return (
    <div id="signupPage">
      <div id="contentSign">
        <div id="signupDiv">
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" name="name" id="name" />
          <br />
          <br />
          <label htmlFor="birthday">Birthday:</label>
          <br />
          <input type="date" name="birthday" id="birthday" />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" name="email" id="email" />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" name="password" id="password" />
          <br />
          <br />
          <button id="signupButton">Signup</button>
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
