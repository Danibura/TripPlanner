import React from "react";
import "../pages/css/userLine.css";
import Pfp from "./Pfp";
import { useEffect } from "react";
import { useState } from "react";

const UserLine = ({
  user,
  setShowProfile = () => {},
  currentPage = "friendsPage",
  handleSend = () => {},
  clickedShare = null,
  setHideTab = () => {},
}) => {
  const [invited, setInvited] = useState(false);
  const checkInvited = () => {
    if (
      user.invitations.some(
        (invitation) => invitation.tripCode == clickedShare
      ) ||
      user.trips.includes(clickedShare)
    )
      setInvited(true);
  };
  useEffect(() => {
    checkInvited();
  }, [user, clickedShare]);
  const handleShowProfile = () => {
    setShowProfile(user);
    setHideTab(false);
  };
  return (
    <div
      id="userLine"
      onClick={() => handleShowProfile()}
      className={currentPage == "friendsPage" ? "greenLine" : "blueLine"}
    >
      <Pfp size={50} user={user} left={50} />
      <div
        id="userLine-name"
        className={currentPage == "friendsPage" ? "greenName" : "blueName"}
      >
        {user.name}
      </div>
      {currentPage == "friendsWindow" &&
        (invited ? (
          <button
            id="alreadySent"
            className="material-symbols-outlined"
            disabled
          >
            check
          </button>
        ) : (
          <button
            id="send"
            className="material-symbols-outlined"
            onClick={() => {
              handleSend(user);
              setInvited(true);
            }}
          >
            send
          </button>
        ))}
    </div>
  );
};

export default UserLine;
