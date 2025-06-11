import React from "react";
import "../pages/css/menu.css";
import Pfp from "./Pfp";
const MenuWindow = ({ user }) => {
  return (
    <div id="menuWindow">
      <ul>
        <li>
          <Pfp user={user} size={50} right={30} /> Profile
        </li>
        <li>
          <h4 className="material-symbols-outlined">hiking</h4>My Trips
        </li>
        <li>
          <h4 className="material-symbols-outlined">public</h4>Public trips
        </li>
        <li>
          <h4 className="material-symbols-outlined">diversity_4</h4>Friends
        </li>
        <li>Notifications</li>
      </ul>
    </div>
  );
};

export default MenuWindow;
