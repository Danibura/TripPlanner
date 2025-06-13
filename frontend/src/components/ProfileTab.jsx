import React, { useEffect } from "react";
import Pfp from "./Pfp";
import "../pages/css/profileTab.css";
import { useState } from "react";
import useAuth from "../store/useAuth";
const ProfileTab = ({
  user,
  setShowProfile,
  userRole = null,
  handleChangeRole = () => {},
  participants = [],
  handleKickOut = () => {},
  secondUser = null,
}) => {
  const [hide, setHide] = useState(false);
  let [friendState, setFriendState] = useState("Stranger");
  const [actualUser, setActualUser] = useState(null);
  const [secondUserVar, setSecondUserVar] = useState(null);
  const { modifyUser } = useAuth();

  const closeProfileTab = () => {
    setHide(true);
    setTimeout(() => setShowProfile(false), 300);
  };

  const handleFriend = async () => {
    let updatedActualUser = actualUser,
      updatedSecondUser = secondUserVar;
    if (friendState == "Stranger") {
      updatedActualUser = {
        ...actualUser,
        requests: [...actualUser.requests, secondUser.email],
      };
      setActualUser(updatedActualUser);
      setFriendState("Request-sent");
    }
    if (friendState == "Request-sent") {
      updatedActualUser = {
        ...actualUser,
        requests: actualUser.requests.filter(
          (request) => request != secondUserVar.email
        ),
      };
      setActualUser(updatedActualUser);
      setFriendState("Stranger");
    }
    if (friendState == "Request-received") {
      updatedActualUser = {
        ...actualUser,
        friends: [...actualUser.friends, secondUserVar.email],
        requests: actualUser.requests.filter(
          (request) => request != secondUserVar.email
        ),
      };
      setActualUser(updatedActualUser);
      updatedSecondUser = {
        ...secondUserVar,
        friends: [...secondUserVar.friends, actualUser.email],
        requests: secondUserVar.requests.filter(
          (request) => request != actualUser.email
        ),
      };
      setSecondUserVar(updatedSecondUser);
      setFriendState("Friend");
    }
    if (friendState == "Friend") {
      updatedActualUser = {
        ...actualUser,
        friends: actualUser.friends.filter(
          (friend) => friend != secondUserVar.email
        ),
      };
      setActualUser(updatedActualUser);
      updatedSecondUser = {
        ...secondUserVar,
        friends: secondUserVar.friends.filter(
          (friend) => friend != actualUser.email
        ),
      };
      setSecondUserVar(updatedSecondUser);
      setFriendState("Stranger");
    }
    try {
      await modifyUser(updatedActualUser);
      await modifyUser(updatedSecondUser);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user.friends.some((friend) => friend == secondUser.email))
      setFriendState("Friend");
    else {
      if (user.requests.some((request) => request == secondUser.email))
        setFriendState("Request-sent");
      else {
        if (secondUser.requests.some((request) => request == user.email))
          setFriendState("Request-received");
        else setFriendState("Stranger");
      }
    }
  }, []);

  useEffect(() => {
    setActualUser(user);
    setSecondUserVar(secondUser);
  });
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
      {user.email != secondUser.email && (
        <button id="friendButton" onClick={handleFriend}>
          {friendState == "Stranger"
            ? "Add friend"
            : friendState == "Request-sent"
            ? "Retire request"
            : friendState == "Request-received"
            ? "Accept request"
            : "Remove friend"}
        </button>
      )}
    </div>
  );
};

export default ProfileTab;
