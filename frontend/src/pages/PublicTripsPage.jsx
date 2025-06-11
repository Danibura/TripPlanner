import React from "react";
import "./css/publicTrips.css";
import Header from "../components/Header";
import MenuWindow from "../components/MenuWindow";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useAuth from "../store/useAuth";
import { useTripStore } from "../store/trip";
import Trip from "../components/Trip";

const PublicTripsPage = () => {
  const [rotateMenu, setRotateMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const email = decoded.email;
  const { findUser } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [searched, setSearched] = useState("");
  const { trips, fetchTrips } = useTripStore();
  const [clickedBin, setClickedBin] = useState(null);

  const handleSearchedChange = (e) => {
    setSearched(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div id="publicTripsPage">
      <Header
        rotateMenu={rotateMenu}
        setRotateMenu={setRotateMenu}
        title="Public trips"
      />
      {rotateMenu && (
        <MenuWindow
          user={currentUser}
          setRotateMenu={setRotateMenu}
          currentPage="publicTrips"
        />
      )}

      <div id="options-box">
        <input
          type="text"
          placeholder="Search"
          id="search"
          value={searched}
          onChange={(e) => {
            handleSearchedChange(e);
          }}
        />
        <div id="dropdown-filters-box">
          <button
            className="material-symbols-outlined"
            id="filters"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
            style={{
              filter: showFilters ? "brightness(1.2)" : "none",
            }}
          >
            instant_mix
          </button>
        </div>
      </div>
      <div id="trips-list">
        {trips?.map((trip, index) => (
          <Trip key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default PublicTripsPage;
