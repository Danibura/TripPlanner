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
  const { findUser, fetchUsers } = useAuth();
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();
  const [rotateMenu, setRotateMenu] = useState(false);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [showProfile, setShowProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState("myFriends");

  const handleSearchedChange = (e) => {
    const newSearched = e.target.value;
    setSearched(newSearched);
    const fFriends = friends.filter(
      (friend) => !friend.name.indexOf(newSearched)
    );
    setFilteredFriends(fFriends);
  };

  const findFriends = async () => {
    const user = await getUpdatedUser();
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

  const handleChangePage = (page) => {
    setCurrentPage(page);
    if (page == "myFriends") findFriends();
    else findOthers();
  };

  const findOthers = async () => {
    try {
      const res = await fetchUsers();
      let others = res.data;
      others = others.filter((other) => other.email != currentUser.email);
      setFriends(others);
      setFilteredFriends(others);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUpdatedUser = async () => {
    const res = await findUser(email);
    const user = res.data;
    setCurrentUser(user);
    return user;
  };

  useEffect(() => {
    findFriends();
  }, []);
  return (
    <div id="friendsPage">
      <FriendsHeader
        rotateMenu={rotateMenu}
        setRotateMenu={setRotateMenu}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
      <div id="friends-option-box">
        <div id="search-friends">
          <input
            type="text"
            placeholder="Search"
            value={searched}
            onChange={(e) => {
              handleSearchedChange(e);
            }}
          />
        </div>
      </div>
      <div id="friendsList">
        {filteredFriends
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((friend) => (
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
          findFriends={findFriends}
          currentPage={currentPage}
          getUpdatedUser={getUpdatedUser}
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
