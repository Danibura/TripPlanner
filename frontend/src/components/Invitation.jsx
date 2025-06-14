import React from "react";
import "../pages/css/invitation.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
const Invitation = ({ tripCode, user, fetchUser }) => {
  const { modifyUser } = useAuth();
  const navigate = useNavigate();
  const goTrip = () => {
    navigate(`/create/${tripCode}`);
  };

  const handleDecline = async () => {
    const updatedUser = {
      ...user,
      invitations: user.invitations.filter(
        (invitation) => invitation != tripCode
      ),
    };
    await modifyUser(updatedUser);
    await fetchUser();
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
      <button
        id="declineInvitation"
        onClick={() => {
          handleDecline();
        }}
      >
        Decline
      </button>
    </div>
  );
};

export default Invitation;
