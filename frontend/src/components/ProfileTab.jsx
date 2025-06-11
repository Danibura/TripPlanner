import React from "react";
import Pfp from "./Pfp";
import "../pages/css/profileTab.css";
import { useState } from "react";
const ProfileTab = ({
  user,
  setShowProfile,
  userRole,
  handleChangeRole,
  participants,
  handleKickOut,
}) => {
  const [hide, setHide] = useState(false);
  const closeProfileTab = () => {
    setHide(true);
    setTimeout(() => setShowProfile(false), 300);
  };
  return (
    <div id="profileTab" className={hide ? "hidden" : ""}>
      <button
        className="material-symbols-outlined"
        id="profileTab-close"
        onClick={closeProfileTab}
      >
        close
      </button>
      <div id="nameAndPfp">
        <h1 id="profileTab-name">{user.name}</h1>
        <Pfp size={60} left={20} user={user} />
      </div>
      <h6 id="profileTab-email">
        Email: &nbsp;<div>{user.email}</div>
      </h6>
      <h3 id="profileTab-birthday">
        Birthday: &nbsp;<div>{user.birthday}</div>
      </h3>
      <h3 id="profileTab-location">
        Location: &nbsp;<div>{user.location}</div>
      </h3>
      <h3 id="profileTab-bio">
        Bio: &nbsp;<div>{user.bio}</div>
      </h3>
      {userRole == "organizer" &&
        participants.some((participant) => participant.email == user.email) && (
          <div>
            <button
              id="make-organizer"
              onClick={() => {
                handleChangeRole(user);
              }}
            >
              Make an organizer
            </button>
            <br />
            <button
              id="kickout"
              onClick={() => {
                handleKickOut(user);
              }}
            >
              Kick out
            </button>
          </div>
        )}
    </div>
  );
};

export default ProfileTab;
