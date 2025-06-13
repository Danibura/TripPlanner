import React from "react";
import "./css/notifications.css";
import Header from "../components/Header";
import MenuWindow from "../components/MenuWindow";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuth from "../store/useAuth";
import Request from "../components/Request";

const NotificationsPage = () => {
  const [rotateMenu, setRotateMenu] = useState();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const email = decoded.email;
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, modifyUser } = useAuth();

  const fetchUser = async () => {
    const res = await findUser(email);
    const user = res.data;
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id="notificationsPage">
      <Header
        title={"Notifications"}
        rotateMenu={rotateMenu}
        setRotateMenu={setRotateMenu}
      />
      {currentUser &&
        currentUser.requests.map((request) => (
          <Request
            key={request}
            email={request}
            secondUser={currentUser}
            fetchUser={fetchUser}
          />
        ))}
      {rotateMenu && (
        <MenuWindow
          user={currentUser}
          setRotateMenu={setRotateMenu}
          currentPage={"notifications"}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
