import React from "react";
import { useState } from "react";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import "./css/profile.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { findUser, modifyUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [modified, setModified] = useState(false);
  const [changePfp, setChangePfp] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setModified(true);
  };

  const handleSubmit = async () => {
    const res = await modifyUser(currentUser);
    if (!res.success) console.log(res.message);
    setModified(false);
  };

  const handleChangePfp = () => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      pfp: prevUser.pfp == 10 ? 1 : prevUser.pfp + 1,
    }));
    setModified(true);
  };

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
          <div id="row1">
            <h1 id="yourProfileTitle">Your &nbsp; profile</h1>
            <div
              id="box-pfp"
              onMouseOver={() => {
                setChangePfp(true);
              }}
              onMouseOut={() => {
                setChangePfp(false);
              }}
            >
              <div
                id="pfp"
                style={{
                  backgroundImage: `url("/images/Ape${currentUser.pfp}.jpg")`,
                }}
              ></div>
              <button
                id="changePfpButton"
                onClick={handleChangePfp}
                style={{
                  visibility: changePfp ? "visible" : "hidden",
                }}
              >
                &#62;
              </button>
            </div>
          </div>
          <div id="row2">
            <div id="column1">
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
              {modified && (
                <button onClick={handleSubmit} id="saveUserButton">
                  Save
                </button>
              )}
            </div>
            <div id="column2">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={currentUser.location}
                onChange={handleChange}
                id="location"
              />
              <br />
              <br />
              <label>Bio: </label>
              <br />
              <textarea
                name="bio"
                value={currentUser.bio}
                onChange={handleChange}
                id="bio"
              />
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ProfilePage;
