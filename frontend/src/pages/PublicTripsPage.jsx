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
import Fields from "../components/Fields";
import CountrySelector from "../components/CountrySelector";
import { useNavigate } from "react-router-dom";

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
  const [filteredTrips, setFilteredTrips] = useState();
  const [selectedFilter, setSelectedFilter] = useState(2);
  const [selectedCountry, setSelectedCountry] = useState("All");

  const navigate = useNavigate();
  const handleSearchedChange = (e) => {
    const newSearched = e.target.value;
    setSearched(newSearched);
    applyFilters(undefined, newSearched, undefined);
  };

  const sortAlphabetical = () => {
    setSelectedFilter(1);
    applyFilters(undefined, undefined, 1);
  };

  const sortChronological = () => {
    setSelectedFilter(2);
    applyFilters(undefined, undefined, 2);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    applyFilters(country, undefined, undefined);
  };

  const applyFilters = (
    countryParam = null,
    newSearchedParam = null,
    selectedFilterParam = null
  ) => {
    const country = countryParam ?? selectedCountry;
    const newSearched = newSearchedParam ?? searched;
    const newFilter = selectedFilterParam ?? selectedFilter;
    var fTrips = trips
      .filter((trip) => trip.country != "private")
      .filter((trip) => !trip.destination.indexOf(newSearched));

    if (newFilter == 1)
      fTrips = fTrips.sort((a, b) =>
        a.destination.localeCompare(b.destination)
      );
    if (newFilter == 2)
      fTrips = fTrips.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      );
    if (country != "All")
      fTrips = fTrips.filter((trip) => trip.country === country);
    setFilteredTrips(fTrips);
  };

  const handleLucky = () => {
    let fTrips = filteredTrips;
    if (selectedCountry != "All")
      fTrips = fTrips.filter((trip) => trip.country === selectedCountry);
    const randomNum = Math.floor(Math.random() * fTrips.length);
    let luckyTrip = fTrips[randomNum];
    navigate(`/create/${luckyTrip.accessCode}`);
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

  //Set filtered trips
  useEffect(() => {
    setFilteredTrips(
      trips
        .filter((trip) => trip.country != "private")
        .filter((trip) => !trip.destination.indexOf(searched))
        .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))
    );
  }, [trips]);

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
        <div id="participantsCountryFilter">
          <label>Participants country:</label>
          <CountrySelector
            selectedCountry={selectedCountry}
            handleSelectCountry={handleSelectCountry}
            all={true}
          />
        </div>
        <button id="luckyButton" onClick={handleLucky}>
          I feel lucky
        </button>
      </div>
      <Fields showCountry={true} />
      <div id="trips-list">
        {filteredTrips?.map((trip, index) => (
          <Trip key={index} trip={trip} showCountry={true} />
        ))}
      </div>
    </div>
  );
};

export default PublicTripsPage;
