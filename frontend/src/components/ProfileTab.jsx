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
  findFriends = () => {},
  currentPage = null,
  getUpdatedUser = () => {},
  setCurrentUser = () => {},
  findOthers = () => {},
  setHideTab = () => {},
  loadTrip = () => {},
}) => {
  let [friendState, setFriendState] = useState("Stranger");
  const actualUser = user;
  const secondUserVar = secondUser;
  const { modifyUser } = useAuth();

  const handleFriend = async () => {
    if (!actualUser || !secondUserVar) return;
    let updatedActualUser = actualUser,
      updatedSecondUser = secondUserVar;
    if (friendState == "Stranger") {
      updatedActualUser = {
        ...actualUser,
        requests: [...actualUser.requests, secondUser.email],
      };
      setFriendState("Request-sent");
    } else if (friendState == "Request-sent") {
      updatedActualUser = {
        ...actualUser,
        requests: actualUser.requests.filter(
          (request) => request != secondUserVar.email
        ),
      };
      setFriendState("Stranger");
    } else if (friendState == "Request-received") {
      updatedActualUser = {
        ...actualUser,
        friends: [...actualUser.friends, secondUserVar.email],
        requests: actualUser.requests.filter(
          (request) => request != secondUserVar.email
        ),
      };
      updatedSecondUser = {
        ...secondUserVar,
        friends: [...secondUserVar.friends, actualUser.email],
        requests: secondUserVar.requests.filter(
          (request) => request != actualUser.email
        ),
      };
      setFriendState("Friend");
    } else if (friendState == "Friend") {
      updatedActualUser = {
        ...actualUser,
        friends: actualUser.friends.filter(
          (friend) => friend != secondUserVar.email
        ),
      };
      updatedSecondUser = {
        ...secondUserVar,
        friends: secondUserVar.friends.filter(
          (friend) => friend != actualUser.email
        ),
      };
      setFriendState("Stranger");
    }
    try {
      await modifyUser(updatedActualUser);
      await modifyUser(updatedSecondUser);
    } catch (err) {
      console.log(err.message);
    }

    if (currentPage == "myFriends") {
      findFriends();
    }
    if (currentPage == "otherTravelers") {
      findOthers();
    }
    const newUser = await getUpdatedUser();
    setCurrentUser(updatedSecondUser);
    setShowProfile(updatedActualUser);
    loadTrip();
  };

  useEffect(() => {
    if (!actualUser || !secondUserVar) return;
    if (actualUser.friends.includes(secondUserVar.email)) {
      setFriendState("Friend");
    } else if (actualUser.requests.includes(secondUserVar.email)) {
      setFriendState("Request-sent");
    } else if (secondUserVar.requests.includes(actualUser.email)) {
      setFriendState("Request-received");
    } else {
      setFriendState("Stranger");
    }
  }, [actualUser, secondUserVar]);

  return (
    <div id="profileTab">
      <button
        className="material-symbols-outlined"
        id="profileTab-close"
        onClick={() => setHideTab(true)}
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
      {secondUser && user.email != secondUser.email && (
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
