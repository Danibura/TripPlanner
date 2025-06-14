import React from "react";
import "../pages/css/invitation.css";
import { useNavigate } from "react-router-dom";
const Invitation = ({ tripCode }) => {
  const navigate = useNavigate();
  const goTrip = () => {
    navigate(`/create/${tripCode}`);
  };

  return (
    <div id="invitation">
      You are invited to join a trip!
      <button
        id="goTrip"
        onClick={() => {
          goTrip();
        }}
      >
        Go
      </button>
    </div>
  );
};

export default Invitation;
