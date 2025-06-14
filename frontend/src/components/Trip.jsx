import React from "react";
import "../pages/css/trip.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Trip = ({
  trip,
  setClickedBin,
  setClickedShare,
  showCountry = false,
}) => {
  const [showBin, setShowBin] = useState(false);
  const [showShare, setShowShare] = useState(false);
  return (
    <Link
      to={`/create/${trip.accessCode}`}
      id="link-trip"
      onMouseOver={() => {
        setShowBin(true);
        setShowShare(true);
      }}
      onMouseOut={() => {
        setShowBin(false);
        setShowShare(false);
      }}
    >
      <div id="trip-line">
        <div id="destination-line">{trip.destination}</div>
        <div id="departureDate-line">{trip.departureDate}</div>
        <div id="returnDate-line">{trip.returnDate}</div>
        {showCountry && <div id="country-line">{trip.country}</div>}

        {showShare && setClickedShare != null && (
          <button
            id="share"
            className="material-symbols-outlined"
            onClick={(e) => {
              e.preventDefault();
              setClickedShare(trip.accessCode);
            }}
          >
            person_add
          </button>
        )}
        {showBin && setClickedBin != null && (
          <button
            className="material-symbols-outlined"
            id="bin"
            onClick={(e) => {
              e.preventDefault();
              setClickedBin(trip.accessCode);
            }}
          >
            delete_forever
          </button>
        )}
      </div>
    </Link>
  );
};

export default Trip;
