import React from "react";
import "./css/reset.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../store/useAuth";
const ResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetToken = useParams();
  const { resetPassword } = useAuth();
  const handleReset = async () => {
    console.log(resetToken);
    console.log(newPassword);
    await resetPassword(resetToken.resetToken, newPassword);
  };
  return (
    <div id="resetPage">
      <div id="content-reset">
        <h2 id="enterPassword-title">Enter new password:</h2>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <h2 id="confirmPassword-title">Confirm password:</h2>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button onClick={() => handleReset()}>Reset password</button>
      </div>
    </div>
  );
};

export default ResetPage;
