import React from "react";
import { useState } from "react";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import "./css/profile.css";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const { findUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [modified, setModified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setModified(true);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      const email = decoded.email;
      const res = await findUser(email);
      const user = res.data;
      if (res.success) setCurrentUser(user);
      else console.error(res.message);
    };
    fetchUser();
  }, []);

  return (
    <div id="profilePage">
      {currentUser ? (
        <div id="box-user-info">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={currentUser.name}
            onChange={handleChange}
            id="name"
          />
          <br />
          <br />
          <label>Birthday: </label>
          <input
            type="date"
            name="birthday"
            value={currentUser.birthday}
            onChange={handleChange}
            id="birthday"
          />
          <br />
          <br />
          <label>Email: </label>
          <input
            type="text"
            readOnly
            name="email"
            value={currentUser.email}
            onChange={handleChange}
            id="email"
          />
          <br />
          <br />
          <label>Bio: </label>
          <br />
          <textarea value="" id="bio" />
          <br />
          <br />
          {modified && <button onClick={handleSubmit}>Save</button>}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ProfilePage;
