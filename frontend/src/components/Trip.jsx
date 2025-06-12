import React from "react";
import "../pages/css/trip.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Trip = ({ trip, setClickedBin, showCountry = false }) => {
  const [showBin, setShowBin] = useState(false);
  return (
    <Link
      to={`/create/${trip.accessCode}`}
      id="link-trip"
      onMouseOver={() => setShowBin(true)}
      onMouseOut={() => setShowBin(false)}
    >
      <div id="trip-line">
        <div id="destination-line">{trip.destination}</div>
        <div id="departureDate-line">{trip.departureDate}</div>
        <div id="returnDate-line">{trip.returnDate}</div>
        {showCountry && <div id="country-line">{trip.country}</div>}
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
