import React from "react";
import "../pages/css/trip.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect, useLayoutEffect } from "react";

const Trip = ({
  trip,
  setClickedBin,
  setClickedShare,
  selectedDots = null,
  setSelectedDots = () => {},
  showCountry = false,
}) => {
  const [showBin, setShowBin] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [hide, setHide] = useState(true);
  const isMobile = window.innerWidth < 600;

  const handleShow = () => {
    setSelectedDots(trip.accessCode);
    setHide((prev) => !prev);
  };
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
      <div
        id="trip-line"
        style={{
          zIndex: !hide && selectedDots == trip.accessCode ? "14" : "1",
        }}
      >
        <div id="destination-line">{trip.destination}</div>
        <div id="departureDate-line">{trip.departureDate}</div>
        <div id="returnDate-line">{trip.returnDate}</div>
        {showCountry && <div id="country-line">{trip.country}</div>}

        {!isMobile && showShare && setClickedShare != null && (
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
        {!isMobile && showBin && setClickedBin != null && (
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
        {!showCountry &&
          isMobile &&
          setClickedShare != null &&
          setClickedBin != null && (
            <div id="dots-box">
              <button
                id="dots"
                className={`material-symbols-outlined ${
                  !hide && selectedDots == trip.accessCode ? "clicked" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleShow();
                }}
              >
                more_horiz
              </button>
              <div
                id="dots-menu"
                className={
                  hide || selectedDots != trip.accessCode ? "hidden" : ""
                }
              >
                <button
                  className="material-symbols-outlined"
                  id="dots-share"
                  onClick={(e) => {
                    e.preventDefault();
                    setClickedShare(trip.accessCode);
                    setSelectedDots(null);
                  }}
                >
                  person_add
                </button>
                <button
                  className="material-symbols-outlined"
                  id="dots-bin"
                  onClick={(e) => {
                    e.preventDefault();
                    setClickedBin(trip.accessCode);
                    setSelectedDots(null);
                  }}
                >
                  delete_forever
                </button>
              </div>
            </div>
          )}
      </div>
    </Link>
  );
};

export default Trip;
