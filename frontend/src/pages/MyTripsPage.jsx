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
import MenuWindow from "../components/MenuWindow";
import Header from "../components/Header";
import Fields from "../components/Fields";
import FriendsWindow from "../components/FriendsWindow";

const MyTripsPage = () => {
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const email = decoded.email;
  var tripCode = parseInt(Math.random() * 100000000);
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, modifyUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const { getTripByCode, modifyTrip, deleteTrip } = useTripStore();
  const [searched, setSearched] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(2);
  const [clickedBin, setClickedBin] = useState(0);
  const [rotateMenu, setRotateMenu] = useState(false);
  const [clickedShare, setClickedShare] = useState(0);
  const [selectedDots, setSelectedDots] = useState(null);

  const handleYes = () => {
    removeTrip();
    setClickedBin(0);
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
    const newTrips = await fetchUserTrips(updatedUser);
    setTrips(newTrips);

    try {
      const res = await getTripByCode(clickedBin);
      const data = res.data;
      let updatedTrip = {
        ...data,
        participants: data.participants.filter(
          (participant) => participant != email
        ),
        organizers: data.organizers.filter((organizer) => organizer != email),
      };
      if (
        updatedTrip.participants.length == 0 &&
        updatedTrip.organizers.length == 0
      ) {
        await deleteTrip(updatedTrip);
      } else {
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserTrips = async (user) => {
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
    fetchUserTrips(currentUser);
  }, [currentUser]);

  //Set filtered trips
  useEffect(() => {
    setFilteredTrips(
      trips
        .filter((trip) => !trip.destination.indexOf(searched))
        .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))
    );
  }, [trips]);

  return (
    <div id="myTripsPage">
      <Header
        rotateMenu={rotateMenu}
        setRotateMenu={setRotateMenu}
        title="My trips"
      />
      <div id="options-box-myTrips">
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
        <Link to={`/join`} id="join-link">
          <button id="joinButton">Join</button>
        </Link>
        <Link to={`/calendar/${currentUser?.calendarCode}`} id="calendar-link">
          <button className="material-symbols-outlined" id="calendarButton">
            calendar_month
          </button>
        </Link>
      </div>
      <Fields />
      <div id="trips-list">
        {filteredTrips?.map((trip, index) => (
          <Trip
            key={index}
            trip={trip}
            setClickedBin={setClickedBin}
            setClickedShare={setClickedShare}
            selectedDots={selectedDots}
            setSelectedDots={setSelectedDots}
          />
        ))}
      </div>
      {clickedBin != 0 && (
        <ConfirmWindow
          message="Are you sure you want to leave the trip?"
          handleYes={handleYes}
          handleNo={() => setClickedBin(0)}
        />
      )}
      {rotateMenu && (
        <MenuWindow
          user={currentUser}
          setRotateMenu={setRotateMenu}
          currentPage="myTrips"
        />
      )}
      {clickedShare != 0 && (
        <FriendsWindow
          user={currentUser}
          clickedShare={clickedShare}
          setClickedShare={setClickedShare}
        />
      )}
    </div>
  );
};

export default MyTripsPage;
