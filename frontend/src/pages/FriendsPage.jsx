import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileTab from "../components/ProfileTab";
import Pfp from "../components/Pfp";
import Header from "../components/Header";
import MenuWindow from "../components/MenuWindow";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../store/useAuth";
import "./css/friends.css";
import FriendsHeader from "../components/FriendsHeader";
import UserLine from "../components/UserLine";

const FriendsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const email = decoded.email;
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser } = useAuth();
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();
  const [rotateMenu, setRotateMenu] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showProfile, setShowProfile] = useState(null);

  const handleSearchedChange = (e) => {
    const newSearched = e.target.value;
    setSearched(newSearched);
    //applyFilters(undefined, newSearched, undefined);
  };

  const findFriends = async (user) => {
    try {
      console.log(user.friends);
      const resultFriends = await Promise.all(
        user.friends.map((friend) => findUser(friend))
      );

      const validFriends = resultFriends
        .filter((res) => res.success)
        .map((res) => {
          console.log(res.data);
          return res.data;
        });

      setFriends(validFriends);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
      findFriends(user);
    };
    fetchUser();
  }, []);
  return (
    <div id="friendsPage">
      <FriendsHeader
        rotateMenu={rotateMenu}
        setRotateMenu={setRotateMenu}
        currentPage="myFriends"
      />
      <div id="friends-option-box">
        <input
          type="text"
          placeholder="Search"
          id="search-friends"
          value={searched}
          onChange={(e) => {
            handleSearchedChange(e);
          }}
        />
      </div>
      <div id="friendsList">
        {friends?.map((friend) => (
          <UserLine
            user={friend}
            key={friend.email}
            setShowProfile={setShowProfile}
          />
        ))}
      </div>
      {showProfile && (
        <ProfileTab
          user={showProfile}
          setShowProfile={setShowProfile}
          secondUser={currentUser}
        />
      )}
      {rotateMenu && (
        <MenuWindow
          user={currentUser}
          setRotateMenu={setRotateMenu}
          currentPage="friends"
        />
      )}
    </div>
  );
};

export default FriendsPage;
