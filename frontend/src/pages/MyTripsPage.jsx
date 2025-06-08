import React from "react";
import "./css/myTrips.css";
import ProfileLink from "../components/ProfileLink";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useTripStore } from "../store/trip";
import { useState } from "react";
import { useEffect } from "react";

const MyTripsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const name = decoded.name;
  const email = decoded.email;
  var tripCode = parseInt(Math.random() * 100000000);
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const { getTripByCode } = useTripStore();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!currentUser) return;
      const accessCodes = currentUser.trips;
      for (let i = 0; i < accessCodes.length; i++) {
        const res = await getTripByCode(accessCodes[i].trim());
        const trip = res.data;
        setTrips([...trips, trip]);
      }
    };
    fetchTrips();
  }, [currentUser]);

  return (
    <div id="myTripsPage">
      <div id="header">
        {<ProfileLink />}
        <h1 id="myTrips-title">{name}'s trips</h1>
      </div>
      <div id="options-box">
        <input type="text" placeholder="Search" id="search" />
        <Link to={`/create/ ${tripCode}`}>
          <button id="createButton">Create</button>
        </Link>
      </div>
      <div id="trips-list">
        {trips.map((trip) => (
          <li key={trip.destination}>{trip.destination}</li>
        ))}
      </div>
    </div>
  );
};

export default MyTripsPage;
