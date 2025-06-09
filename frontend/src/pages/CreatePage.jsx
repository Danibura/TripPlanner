import React, { useEffect, useState } from "react";
import "./css/create.css";
import { useTripStore } from "../store/trip";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Activity from "../components/Activity";
import HomeLink from "../components/HomeLink";
import { jwtDecode } from "jwt-decode";
import useAuth from "../store/useAuth";

const provider = new OpenStreetMapProvider();

const CreatePage = () => {
  //Creates new trip
  const [newTrip, setNewTrip] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    accessCode: "",
    usefulInfo: "",
    activities: [],
    organizers: [],
    participants: [],
  });

  //States
  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { createTrip, modifyTrip, fetchTrips, trips } = useTripStore();
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, modifyUser } = useAuth();
  var { tripCode } = useParams();
  tripCode = tripCode.trim();
  const [join, setJoin] = useState(false);
  //Update or create trip
  const handleSaveTrip = async () => {
    var ok = true;
    if (!newTrip.destination) {
      alert("Please choose a destination");
      ok = false;
    }
    if (!newTrip.departureDate) {
      alert("Please choose a departure date");
      ok = false;
    }
    if (!newTrip.returnDate) {
      alert("Please choose a return date");
      ok = false;
    }
    if (!ok) return;
    const updatedTrip = {
      ...newTrip,
      participants:
        newTrip.participants?.includes(currentUser.email) ||
        newTrip.organizers?.includes(currentUser.email)
          ? newTrip.participants
          : [...newTrip.participants, currentUser.email],
    };

    const existing = trips.find((t) => t.accessCode === newTrip.accessCode);
    if (existing) {
      const { success, message } = await modifyTrip(updatedTrip);
      console.log("Updated ", success, message);
    } else {
      const { success, message } = await createTrip(updatedTrip);
      console.log("Created:", newTrip, success, message);
    }
    setNewTrip(updatedTrip);
    const updatedUser = {
      ...currentUser,
      trips: currentUser.trips.includes(tripCode)
        ? currentUser.trips
        : [...currentUser.trips, tripCode],
    };
    setCurrentUser(updatedUser);
    const res = await modifyUser(updatedUser);
    if (!res.success) console.log("Error", res.message);
    else console.log("Trip added to the user");
    alert("Trip saved successfully");
  };

  //Updates map
  const updateMapFromDestination = (destination) => {
    if (!destination) return;
    provider.search({ query: destination }).then((results) => {
      if (results && results.length > 0) {
        setSuggestions(results);
        const { x, y } = results[0];
        setCoords([y, x]);
      }
    });
  };

  //Changes trip destination
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setNewTrip((prev) => ({ ...prev, destination: value }));
  };

  //Updates map
  const handleDestinationBlur = () => {
    updateMapFromDestination(newTrip.destination);
  };

  const handleDestinationKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita invio form
      updateMapFromDestination(newTrip.destination);
    }
  };

  //Add blank activity to the trip
  const addActivity = () => {
    setNewTrip((prev) => ({
      ...prev,
      activities: [...prev.activities, ""],
    }));
  };

  //Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      const email = decoded.email;
      const res = await findUser(email);
      const user = res.data;
      if (res.success) setCurrentUser(user);
      else console.error(res.message);
    };
    fetchUser();
  }, []);

  //Fill fields and map with the info of the trip
  useEffect(() => {
    if (!currentUser) return;
    const match = trips.find((trip) => trip.accessCode === tripCode);
    if (match) {
      setNewTrip(match);
      if (
        !match.participants?.includes(currentUser.email) &&
        !match.organizers?.includes(currentUser.email)
      )
        setJoin(true);
      provider.search({ query: match.destination }).then((results) => {
        if (results && results.length > 0) {
          const { x, y } = results[0];
          setCoords([y, x]);
        }
      });
    } else
      setNewTrip((prevTrip) => ({
        ...prevTrip,
        organizers: prevTrip.organizers?.includes(currentUser.email)
          ? prevTrip.organizers
          : [...prevTrip.organizers, currentUser.email],
      }));
  }, [trips, tripCode, currentUser]);

  //Fetch trips and set access code
  useEffect(() => {
    fetchTrips();
    setNewTrip((prev) => ({ ...prev, accessCode: tripCode.toString() }));
  }, []);

  return (
    <div id="createPage">
      <HomeLink />
      <div id="blur">
        <input
          id="destination"
          placeholder="Destination"
          name="destination"
          list="destination-options"
          value={newTrip.destination}
          onChange={handleDestinationChange}
          onBlur={handleDestinationBlur}
          onKeyDown={handleDestinationKeyDown}
        />
        <datalist id="destination-options">
          {suggestions.map((s, index) => (
            <option key={index} value={s.label} />
          ))}
        </datalist>
        <br />
        <label id="label-departure">Departure date</label>{" "}
        <input
          type="date"
          id="departure"
          name="departure"
          value={newTrip.departureDate}
          onChange={(e) =>
            setNewTrip({ ...newTrip, departureDate: e.target.value })
          }
        />
        <br />
        <br />
        <label id="label-return">Return date</label>{" "}
        <input
          type="date"
          id="return"
          name="return"
          value={newTrip.returnDate}
          onChange={(e) =>
            setNewTrip({ ...newTrip, returnDate: e.target.value })
          }
        />
        <div id="box-activities">
          <h3 id="title-activities">Activities</h3>
          {newTrip.activities &&
            newTrip.activities.map((activity, index) => (
              <Activity
                key={index}
                index={index}
                value={activity}
                onChange={(i, newValue) => {
                  const updated = [...newTrip.activities];
                  updated[i] = newValue;
                  setNewTrip({ ...newTrip, activities: updated });
                }}
              />
            ))}
          <button id="add-activity" onClick={addActivity}>
            Add activity
          </button>
        </div>
        <div id="box-info">
          <h3 id="title-info">Useful info</h3>
          <textarea
            id="info"
            placeholder="Insert info that may be useful"
            value={newTrip.usefulInfo}
            onChange={(e) =>
              setNewTrip({ ...newTrip, usefulInfo: e.target.value })
            }
          ></textarea>
        </div>
        <div id="box-participants">
          <h3 id="title-participants">Participants</h3>
          <div id="box-participants-icon">
            {newTrip.organizers.map((organizer) => organizer + ", ")}
            {newTrip.participants.map((participant) => participant + ", ")}
          </div>
        </div>
      </div>

      <div id="map">
        <MapComponent coords={coords} />
      </div>

      <div id="bottom-right-corner">
        <div id="box-code">
          <label id="code-title">Access code</label>
          <br />
          <textarea id="code-area" value={tripCode} readOnly />
        </div>
        <button id="save" onClick={handleSaveTrip}>
          {join ? "Join" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
