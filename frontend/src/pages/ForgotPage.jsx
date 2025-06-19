import React from "react";
import "./css/forgot.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import useAuth from "../store/useAuth";
const VerifyOtpPage = () => {
  const { createResetToken } = useAuth();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleSendEmail = async () => {
    try {
      const res = await createResetToken(email);
      if (!res.success) {
        alert("User not found");
        return;
      }
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
      setEmailSent(true);
    } catch (error) {}
  };
  return (
    <div id="forgotPage">
      {!emailSent ? (
        <div id="forgot-content">
          <div>
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
      ) : (
        <h1 id="weSent">
          We sent you an email with a link to reset your password
        </h1>
      )}
    </div>
  );
};

export default VerifyOtpPage;
