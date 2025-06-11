import React from "react";
import "../pages/css/menuWindow.css";
import Pfp from "./Pfp";
import { Link } from "react-router-dom";
const MenuWindow = ({ user, setRotateMenu, currentPage }) => {
  return (
    <div id="menuWindow">
      <ul>
        <Link
          to={"/profile"}
          id="profileLink"
          onClick={() => {
            if (currentPage == "profile") setRotateMenu(false);
          }}
        >
          <li>
            <Pfp user={user} size={50} right={30} /> Profile
          </li>
        </Link>
        <Link
          to={"/myTrips"}
          id="myTripsLink"
          onClick={() => {
            if (currentPage == "myTrips") setRotateMenu(false);
          }}
        >
          <li>
            <h4 className="material-symbols-outlined">hiking</h4>My Trips
          </li>
        </Link>
        <Link
          to={"/publicTrips"}
          id="publicTripsLink"
          onClick={() => {
            if (currentPage == "publicTrips") setRotateMenu(false);
          }}
        >
          <li>
            <h4 className="material-symbols-outlined">public</h4>Public trips
          </li>
        </Link>

        <li>
          <h4 className="material-symbols-outlined">diversity_4</h4>Friends
        </li>
        <li>
          <h4 className="material-symbols-outlined">notifications</h4>
          Notifications
        </li>
      </ul>
    </div>
  );
};

export default MenuWindow;
