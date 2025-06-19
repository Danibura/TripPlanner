import React from "react";
import "../pages/css/friendsWindow.css";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../store/useAuth";
import UserLine from "./UserLine";
import emailjs from "@emailjs/browser";

const FriendsWindow = ({ user, clickedShare, setClickedShare }) => {
  const [searched, setSearched] = useState("");
  const [friends, setFriends] = useState();
  const [filteredFriends, setFilteredFriends] = useState();
  const { findUser, modifyUser } = useAuth();
  const initializeFriends = async () => {
    try {
      const resultFriends = await Promise.all(
        user.friends.map((friend) => findUser(friend))
      );

      const validFriends = resultFriends
        .filter((res) => res.success)
        .map((res) => res.data);

      setFriends(validFriends);
      setFilteredFriends(validFriends);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSearchedChange = (e) => {
    const newSearched = e.target.value;
    setSearched(newSearched);
    const fFriends = friends.filter(
      (friend) => !friend.name.indexOf(newSearched)
    );
    setFilteredFriends(fFriends);
  };

  const handleSend = async (invitedUser) => {
    const invitation = {
      tripCode: clickedShare,
      fromEmail: user.email,
    };
    const updatedUser = {
      ...invitedUser,
      invitations: [...invitedUser.invitations, invitation],
    };
    await modifyUser(updatedUser);

    const templateParams = {
      fromUser: user.name,
      toEmail: invitedUser.email,
      tripUrl: `https://trip-planner-rust-gamma.vercel.app/create/${clickedShare}`,
    };
    await emailjs.send(
      "service_a2rh57b",
      "template_32fbstp",
      templateParams,
      "PFcVjibW4RPWoHJiX"
    );
    console.log(templateParams);
  };

  useEffect(() => {
    initializeFriends();
  }, [user]);

  return (
    <div id="friendsWindow">
      <div id="friendsWindow-options-box">
        <div id="search-friendsWindow">
          <input
            type="text"
            placeholder="Search"
            value={searched}
            onChange={(e) => {
              handleSearchedChange(e);
            }}
          />
        </div>
        <button
          id="closeButton-friendsWindow"
          className="material-symbols-outlined"
          onClick={() => setClickedShare(0)}
        >
          close
        </button>
      </div>
      <div id="friendsList-window">
        {filteredFriends?.map((friend) => (
          <UserLine
            user={friend}
            key={friend.email}
            currentPage="friendsWindow"
            handleSend={handleSend}
            clickedShare={clickedShare}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendsWindow;
