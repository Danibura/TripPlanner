import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import "../pages/css/friendsHeader.css";
const FriendsHeader = ({ rotateMenu, setRotateMenu, currentPage }) => {
  return (
    <div id="friendsHeader">
      <MenuButton rotateMenu={rotateMenu} setRotateMenu={setRotateMenu} />
      <div id="myFriendsDiv">
        <Link
          id="myFriends"
          to={"/friends"}
          className={currentPage == "myFriends" ? "underline" : ""}
        >
          My friends
        </Link>
      </div>
      <div id="otherTravalersDiv">
        <Link
          id="otherTravelers"
          to={"/otherTravelers"}
          className={currentPage == "otherTravelers" ? "underline" : ""}
        >
          Other travelers
        </Link>
      </div>
    </div>
  );
};

export default FriendsHeader;
