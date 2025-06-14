import React from "react";
import "../pages/css/invitation.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import { useState } from "react";

const Invitation = ({ invitation, user, fetchUser }) => {
  const { findUser, modifyUser } = useAuth();
  const navigate = useNavigate();
  const [userInviting, setUserInviting] = useState("");
  const goTrip = () => {
    navigate(`/create/${invitation.tripCode}`);
  };

  const initializeUserInviting = async () => {
    const res = await findUser(invitation.fromEmail);
    const newUserInviting = res.data;
    console.log(newUserInviting);
    setUserInviting(newUserInviting);
  };

  const handleDecline = async () => {
    const updatedUser = {
      ...user,
      invitations: user.invitations.filter(
        (invitation) => invitation.tripCode != tripCode
      ),
    };
    await modifyUser(updatedUser);
    await fetchUser();
  };

  useEffect(() => {
    initializeUserInviting();
  }, [invitation]);

  return (
    <div id="invitation">
      {userInviting.name + " invited you to join a trip!"}
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
