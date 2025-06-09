import React from "react";
import "./css/myTrips.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useTripStore } from "../store/trip";
import { useState } from "react";
import { useEffect } from "react";
import Trip from "../components/Trip";
import ConfirmWindow from "../components/ConfirmWindow";

const MyTripsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const name = decoded.name;
  const email = decoded.email;
  var tripCode = parseInt(Math.random() * 100000000);
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, logout, modifyUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const { getTripByCode, modifyTrip } = useTripStore();
  const [searched, setSearched] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [clickedBin, setClickedBin] = useState(0);

  const handleLogout = async () => {
    logout();
  };

  const handleSearchedChange = (e) => {
    setSearched(e.target.value);
    const fTrips = trips.filter(
      (trip) => !trip.destination.indexOf(e.target.value)
    );
    if (selectedFilter == 1)
      setFilteredTrips(
        fTrips.sort((a, b) => a.destination.localeCompare(b.destination))
      );
    else
      setFilteredTrips(
        fTrips.sort(
          (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
        )
      );
  };

  const sortAlphabetical = () => {
    setSelectedFilter(1);
    setFilteredTrips(
      filteredTrips.sort((a, b) => a.destination.localeCompare(b.destination))
    );
  };

  const sortChronological = () => {
    setSelectedFilter(2);
    setFilteredTrips(
      filteredTrips.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      )
    );
  };

  const removeTrip = async () => {
    const updatedUser = {
      ...currentUser,
      trips: currentUser.trips.filter((trip) => trip !== clickedBin),
    };
    try {
      await modifyUser(updatedUser);
    } catch (err) {
      console.log(err.message);
    }
    setCurrentUser(updatedUser);
    const newTrips = await fetchTrips(updatedUser);
    setTrips(newTrips);
    try {
      const res = await getTripByCode(clickedBin);
      const data = res.data;
      const removedTrip = {
        ...data,
        participants: data.participants.filter(
          (participant) => participant != email
        ),
        organizers: data.organizers.filter((organizer) => organizer != email),
      };
      await modifyTrip(removedTrip);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchTrips = async (user) => {
    if (!user) return;
    const accessCodes = user.trips;
    var newTrips = [];
    for (let i = 0; i < accessCodes.length; i++) {
      const res = await getTripByCode(accessCodes[i].trim());
      const trip = res.data;
      newTrips = [...newTrips, trip];
    }
    setTrips(newTrips);
    return newTrips;
  };

  //Finds user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUser(email);
      const user = res.data;
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  //Finds trips
  useEffect(() => {
    fetchTrips(currentUser);
  }, [currentUser]);

  //Set filtered trips
  useEffect(() => {
    setFilteredTrips(
      trips
        .filter((trip) => !trip.destination.indexOf(searched))
        .sort((a, b) => a.destination.localeCompare(b.destination))
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
        {filteredTrips?.map((trip, index) => (
          <Trip
            key={index}
            destination={trip.destination}
            departureDate={trip.departureDate}
            returnDate={trip.returnDate}
            code={trip.accessCode}
            setClickedBin={setClickedBin}
          />
        ))}
      </div>
      {clickedBin != 0 && (
        <ConfirmWindow removeTrip={removeTrip} setClickedBin={setClickedBin} />
      )}
    </div>
  );
};

export default MyTripsPage;
