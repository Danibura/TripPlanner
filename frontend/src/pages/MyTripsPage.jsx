import React from "react";
import "./css/myTrips.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useTripStore } from "../store/trip";
import { useState } from "react";
import { useEffect } from "react";
import Trip from "../components/Trip";

const MyTripsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const name = decoded.name;
  const email = decoded.email;
  var tripCode = parseInt(Math.random() * 100000000);
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const { getTripByCode } = useTripStore();
  const [searched, setSearched] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const handleLogout = async () => {
    logout();
  };

  const handleSearchedChange = (e) => {
    setSearched(e.target.value);
    const fTrips = trips.filter(
      (trip) => !trip.destination.indexOf(e.target.value)
    );
    setFilteredTrips(fTrips);
  };

  const sortAlphabetical = () => {
    setSelectedFilter(1);
    setFilteredTrips(
      trips.sort((a, b) => a.destination.localeCompare(b.destination))
    );
  };

  const sortChronological = () => {
    setSelectedFilter(2);
    setFilteredTrips(
      trips.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      )
    );
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
    const fetchTrips = async () => {
      if (!currentUser) return;
      const accessCodes = currentUser.trips;
      for (let i = 0; i < accessCodes.length; i++) {
        const res = await getTripByCode(accessCodes[i].trim());
        const trip = res.data;
        setTrips((prevTrips) => {
          if (prevTrips.some((t) => t.accessCode == trip.accessCode))
            return prevTrips;
          else return [...prevTrips, trip];
        });
      }
    };
    fetchTrips();
  }, [currentUser]);

  useEffect(() => {
    setFilteredTrips(
      trips.sort((a, b) => a.destination.localeCompare(b.destination))
    );
  }, [trips]);

  return (
    <div id="myTripsPage">
      <div id="header">
        <Link to={"/profile"}>
          <div
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              backgroundImage: `url("/images/Ape${currentUser?.pfp}.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Link>
        <h1 id="myTrips-title">{name}'s trips</h1>
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
          <div id="dropdown-filters-menu" className={showFilters ? "drop" : ""}>
            <button
              onClick={sortAlphabetical}
              style={{
                color: selectedFilter == 1 && "rgb(3, 10, 97)",
              }}
            >
              {selectedFilter == 1 && (
                <span className="material-symbols-outlined">check</span>
              )}
              Alphabetical
            </button>
            <button
              onClick={sortChronological}
              style={{
                color: selectedFilter == 2 && "rgb(3, 10, 97)",
              }}
            >
              {selectedFilter == 2 && (
                <span className="material-symbols-outlined">check</span>
              )}
              Chronological
            </button>
          </div>
        </div>

        <Link to={`/create/ ${tripCode}`} id="create-link">
          <button id="createButton">Create</button>
        </Link>
        <Link to={`/join`}>
          <button id="joinButton">Join</button>
        </Link>
      </div>
      <div id="trips-list">
        {filteredTrips.map((trip, index) => (
          <Trip
            key={index}
            destination={trip.destination}
            departureDate={trip.departureDate}
            returnDate={trip.returnDate}
            code={trip.accessCode}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTripsPage;
