import React from "react";
import "../pages/css/header.css";
import MenuButton from "./MenuButton";
const Header = ({ rotateMenu, setRotateMenu, title }) => {
  return (
    <div>
      <MenuButton rotateMenu={rotateMenu} setRotateMenu={setRotateMenu} />
      <div
        id="header"
        className={
          title == "My trips"
            ? "myTrips"
            : title == "Public trips"
            ? "publicTrips"
            : title == "Notifications"
            ? "notifications"
            : ""
        }
      >
        <h1 id="header-title">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
