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
const FriendsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const email = decoded.email;
  var tripCode = parseInt(Math.random() * 100000000);
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser } = useAuth();
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();
  const [rotateMenu, setRotateMenu] = useState(false);

  const handleSearchedChange = (e) => {
    const newSearched = e.target.value;
    setSearched(newSearched);
    //applyFilters(undefined, newSearched, undefined);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
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
          id="search"
          value={searched}
          onChange={(e) => {
            handleSearchedChange(e);
          }}
        />
      </div>
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
