import React from "react";
import "./css/forgot.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import useAuth from "../store/useAuth";
const VerifyOtpPage = () => {
  const { createResetToken } = useAuth();
  const [email, setEmail] = useState("");
  const handleSendEmail = async () => {
    try {
      const res = await createResetToken(email);
      const resetUrl = res.resetUrl;
      const templateParams = {
        link: resetUrl,
        email: email,
      };
      await emailjs.send(
        "service_a2rh57b",
        "template_ag3m0zn",
        templateParams,
        "PFcVjibW4RPWoHJiX"
      );
      console.log("Email inviata con successo");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div id="forgotPage">
      <div id="forgot-content">
        <h3 id="enter-email">Enter your email:</h3>
        <input
          type="email"
          id="forgot-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button id="submit-email" onClick={() => handleSendEmail()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
