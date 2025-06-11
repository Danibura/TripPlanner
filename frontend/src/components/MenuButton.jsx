import React from "react";
import "../pages/css/menuButton.css";
const MenuButton = ({ rotateMenu, setRotateMenu }) => {
  return (
    <button
      className={`material-symbols-outlined ${rotateMenu ? "rotated" : ""}`}
      id="menu"
      onClick={() => setRotateMenu(!rotateMenu)}
    >
      menu
    </button>
  );
};

export default MenuButton;
