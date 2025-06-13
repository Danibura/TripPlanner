import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import "../pages/css/friendsHeader.css";
const FriendsHeader = ({
  rotateMenu,
  setRotateMenu,
  currentPage,
  handleChangePage,
}) => {
  return (
    <div id="friendsHeader">
      <MenuButton rotateMenu={rotateMenu} setRotateMenu={setRotateMenu} />
      <div>
        <button
          id="myFriends"
          className={currentPage == "myFriends" ? "underline" : ""}
          onClick={() => handleChangePage("myFriends")}
        >
          My friends
        </button>
      </div>
      <div>
        <button
          id="otherTravelers"
          className={currentPage == "otherTravelers" ? "underline" : ""}
          onClick={() => handleChangePage("otherTravelers")}
        >
          Other travelers
        </button>
      </div>
    </div>
  );
};

export default FriendsHeader;
