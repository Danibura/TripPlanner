import React from "react";
import "../pages/css/trip.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Trip = ({
  destination,
  departureDate,
  returnDate,
  code,
  setClickedBin,
}) => {
  const [showBin, setShowBin] = useState(false);
  return (
    <Link
      to={`/create/${code}`}
      id="link-trip"
      onMouseOver={() => setShowBin(true)}
      onMouseOut={() => setShowBin(false)}
    >
      <div id="trip-line">
        <div id="destination-line">{destination}</div>
        <div id="departureDate-line">{departureDate}</div>
        <div id="returnDate-line">{returnDate}</div>
        {showBin && (
          <button
            className="material-symbols-outlined"
            id="bin"
            onClick={(e) => {
              e.preventDefault();
              setClickedBin(code);
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
