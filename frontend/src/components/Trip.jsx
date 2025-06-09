import React from "react";
import "../pages/css/trip.css";
import { Link } from "react-router-dom";
const Trip = ({ destination, departureDate, returnDate, code }) => {
  return (
    <Link to={`/create/${code}`} id="link-trip">
      <div id="trip-line">
        <div id="destination-line">{destination}</div>
        <div id="departureDate-line">{departureDate}</div>
        <div id="returnDate-line">{returnDate}</div>
      </div>
    </Link>
  );
};

export default Trip;
