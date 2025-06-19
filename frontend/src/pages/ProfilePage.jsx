import React from "react";
import { useState } from "react";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import "./css/profile.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import MenuButton from "../components/MenuButton";
import MenuWindow from "../components/MenuWindow";
import { useNavigate } from "react-router-dom";
import ConfirmWindow from "../components/ConfirmWindow";
import { getTripByCode } from "../../../backend/controllers/trip.controller";
import { useTripStore } from "../store/trip";
const ProfilePage = () => {
  const { findUser, modifyUser, logout, deleteUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [modified, setModified] = useState(false);
  const [changePfp, setChangePfp] = useState(false);
  const [rotateMenu, setRotateMenu] = useState(false);
  const [confirm, showConfirm] = useState(false);
  const { getTripByCode, deleteTrip, modifyTrip } = useTripStore();
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    try {
      const userFriends = await Promise.all(
        currentUser.friends.map(async (friendEmail) => {
          const res = await findUser(friendEmail);
          return res.data;
        })
      );

      await Promise.all(
        userFriends.map(async (friend) => {
          const updatedFriend = {
            ...friend,
            friends: friend.friends.filter((f) => f != currentUser.email),
          };
          await modifyUser(updatedFriend);
        })
      );

      const trips = await Promise.all(
        currentUser.trips.map(async (tripCode) => {
          const res = await getTripByCode(tripCode);
          return res.data;
        })
      );

      await Promise.all(
        trips.map(async (trip) => {
          let updatedTrip = {
            ...trip,
            organizers: trip.organizers.filter(
              (organizer) => organizer != currentUser.email
            ),
            participants: trip.participants.filter(
              (participant) => participant != currentUser.email
            ),
          };
          if (
            updatedTrip.organizers.length == 0 &&
            updatedTrip.participants.length == 0
          )
            await deleteTrip();
          else {
            if (updatedTrip.organizers.length == 0) {
              updatedTrip = {
                ...updatedTrip,
                organizers: [
                  ...updatedTrip.organizers,
                  updatedTrip.participants[0],
                ],
                participants: updatedTrip.participants.slice(1),
              };
            }
            await modifyTrip(updatedTrip);
          }
        })
      );

      const res = await deleteUser(currentUser.email);
      console.log(res.message);
    } catch (error) {
      console.log(error.message);
    }
    logout();
    navigate("/");
  };
  const handleLogout = async () => {
    logout();
  };

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
    <div>
      <MenuButton rotateMenu={rotateMenu} setRotateMenu={setRotateMenu} />
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
              <Link to={"/"} id="logoutLink">
                <button
                  className="material-symbols-outlined"
                  id="logout"
                  onClick={handleLogout}
                  title="Logout"
                >
                  logout
                </button>
              </Link>
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
                <label>Location: </label>
                <input
                  type="text"
                  name="location"
                  value={currentUser.location}
                  onChange={handleChange}
                  id="location"
                />
                <br />
                <br />
                <div id="bio-div">
                  <label>Bio: </label>
                  <textarea
                    name="bio"
                    value={currentUser.bio}
                    onChange={handleChange}
                    id="bio"
                  />
                </div>
              </div>
            </div>
            <button id="delete-profile" onClick={() => showConfirm(true)}>
              Delete profile
            </button>
            {confirm && (
              <ConfirmWindow
                message="Are you sure you want to delete the profile?"
                handleYes={handleDeleteUser}
                handleNo={() => showConfirm(false)}
              />
            )}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
        {rotateMenu && (
          <MenuWindow
            user={currentUser}
            setRotateMenu={setRotateMenu}
            currentPage="profile"
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
