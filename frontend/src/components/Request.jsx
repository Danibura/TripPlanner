import React from "react";
import "../pages/css/request.css";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import useAuth from "../store/useAuth";
import { useEffect } from "react";

const Request = ({ email, secondUser, fetchUser }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [secondUserVar, setSecondUserVar] = useState(secondUser);
  const { findUser, modifyUser } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleAccept = async () => {
    try {
      const updatedUser = {
        ...currentUser,
        friends: [...currentUser.friends, secondUser.email],
      };
      await modifyUser(updatedUser);
      setCurrentUser(updatedUser);
      const updatedSecondUser = {
        ...secondUserVar,
        requests: secondUserVar.requests.filter((request) => request != email),
        friends: [...secondUserVar.friends, email],
      };
      await modifyUser(updatedSecondUser);
      setSecondUserVar(updatedSecondUser);
    } catch (err) {
      console.log(err.message);
    }
    fetchUser();
  };

  const handleRefuse = async () => {
    try {
      const updatedSecondUser = {
        ...secondUserVar,
        requests: secondUserVar.requests.filter((request) => request != email),
      };
      await modifyUser(updatedSecondUser);
      setSecondUserVar(updatedSecondUser);
    } catch (err) {
      console.log(err.message);
    }
    fetchUser();
  };

  return (
    <div id="request">
      {currentUser?.name} wants to become your friend!
      <button id="accept-request" onClick={handleAccept}>
        Accept
      </button>
      <button id="refuse-request" onClick={handleRefuse}>
        Refuse
      </button>
    </div>
  );
};

export default Request;
