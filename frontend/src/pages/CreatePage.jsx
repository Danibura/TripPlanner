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
import Pfp from "../components/Pfp";
import ParticipantsWindow from "../components/ParticipantsWindow";
import ProfileTab from "../components/ProfileTab";
import CountrySelector from "../components/CountrySelector";
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
    country: "private",
  });

  //States
  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { createTrip, modifyTrip, fetchTrips, trips } = useTripStore();
  const [currentUser, setCurrentUser] = useState(null);
  const { findUser, modifyUser } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  var { tripCode } = useParams();
  tripCode = tripCode.trim();
  const [showParticipants, setShowParticipants] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
  const [userRole, setUserRole] = useState("visitor");
  const [selectedCountry, setSelectedCountry] = useState("International");

  //Update or create trip
  const handleSaveTrip = async () => {
    var ok = true;
    if (!newTrip.destination) {
      alert("Please choose a destination");
      ok = false;
    }
    if (!newTrip.departureDate && ok) {
      alert("Please choose a departure date");
      ok = false;
    }
    if (!newTrip.returnDate && ok) {
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
    console.log(updatedTrip);
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
    else {
      if (userRole == "organizer") alert("Trip saved successfully!");
      else alert("Trip joined!");
    }
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
      e.preventDefault();
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

  const handleShowParticipants = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowParticipants(true);
  };

  //Change user role
  const handleChangeRole = async (userToChange) => {
    const updatedTrip = {
      ...newTrip,
      participants: newTrip.participants.filter(
        (participant) => participant != userToChange.email
      ),
      organizers: [...newTrip.organizers, userToChange.email],
    };
    setNewTrip(updatedTrip);
    const { success, message } = await modifyTrip(updatedTrip);
    console.log("Updated ", success, message);
  };

  //Kickout user
  const handleKickOut = async (userToExpel) => {
    const updatedTrip = {
      ...newTrip,
      participants: newTrip.participants.filter(
        (participant) => participant != userToExpel.email
      ),
    };
    setNewTrip(updatedTrip);
    const { success, message } = await modifyTrip(updatedTrip);
    console.log("Updated ", success, message);
  };

  const handleSelectCountry = (country) => {
    setNewTrip({ ...newTrip, country: country });
    setSelectedCountry(country);
  };

  const changePublic = (publicValue) => {
    if (!publicValue) setNewTrip({ ...newTrip, country: "private" });
    else setNewTrip({ ...newTrip, country: "International" });
  };

  useEffect(() => {
    setSelectedCountry(newTrip.country);
  });

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
      if (match.participants?.includes(currentUser.email))
        setUserRole("participant");
      if (match.organizers?.includes(currentUser.email))
        setUserRole("organizer");

      provider.search({ query: match.destination }).then((results) => {
        if (results && results.length > 0) {
          const { x, y } = results[0];
          setCoords([y, x]);
        }
      });
    } else {
      setNewTrip((prevTrip) => ({
        ...prevTrip,
        organizers: prevTrip.organizers?.includes(currentUser.email)
          ? prevTrip.organizers
          : [...prevTrip.organizers, currentUser.email],
      }));
      setUserRole("organizer");
    }
  }, [trips, tripCode, currentUser]);

  //Fetch trips and set access code
  useEffect(() => {
    fetchTrips();
    setNewTrip((prev) => ({ ...prev, accessCode: tripCode.toString() }));
  }, []);

  useEffect(() => {
    const fetchAllParticipants = async () => {
      const resultsParticipants = await Promise.all(
        newTrip.participants.map((participant) => findUser(participant))
      );
      const validParticipants = resultsParticipants
        .filter((res) => res.success)
        .map((res) => res.data);

      setParticipants(validParticipants);
    };
    fetchAllParticipants();
  }, [newTrip.participants]);

  useEffect(() => {
    const fetchAllOrganizers = async () => {
      const resultsOrganizers = await Promise.all(
        newTrip.organizers.map((participant) => findUser(participant))
      );
      const validOrganizers = resultsOrganizers
        .filter((res) => res.success)
        .map((res) => res.data);

      setOrganizers(validOrganizers);
    };
    fetchAllOrganizers();
  }, [newTrip.organizers]);

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
          readOnly={userRole != "organizer"}
        />
        <datalist id="destination-options">
          {suggestions.map((s, index) => (
            <option key={index} value={s.label} />
          ))}
        </datalist>
        <br />
        <label id="label-departureDate">Departure date</label>{" "}
        <input
          type="date"
          id="departureDate"
          name="departureDate"
          value={newTrip.departureDate}
          onChange={(e) =>
            setNewTrip({ ...newTrip, departureDate: e.target.value })
          }
          readOnly={userRole != "organizer"}
        />
        <br />
        <br />
        <label id="label-returnDate">Return date</label>
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          value={newTrip.returnDate}
          onChange={(e) =>
            setNewTrip({ ...newTrip, returnDate: e.target.value })
          }
          readOnly={userRole != "organizer"}
        />
        <br />
        <br />
        <div id="boxIsPublic">
          <label id="isPublic">Public</label>
          <label id="switchPublic">
            <input
              type="checkbox"
              checked={newTrip.country != "private"}
              disabled={userRole != "organizer"}
              onChange={(e) => changePublic(e.target.checked)}
            />
            <span id="sliderPublic"></span>
          </label>
          {newTrip.country != "private" && (
            <div id="divCountrySel">
              <label>Participats country: </label>
              <CountrySelector
                userRole={userRole}
                handleSelectCountry={handleSelectCountry}
                selectedCountry={selectedCountry}
              />
            </div>
          )}
        </div>
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
          <button
            id="add-activity"
            onClick={addActivity}
            disabled={userRole != "organizer"}
          >
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
            readOnly={userRole != "organizer"}
          ></textarea>
        </div>
        <div id="box-participants">
          <h3 id="title-participants">Participants</h3>
          <div id="box-participants-icon" onClick={handleShowParticipants}>
            {organizers.map((organizer) => (
              <Pfp
                user={organizer}
                size={50}
                key={organizer.email}
                left="-20px"
              />
            ))}
            {participants.map((participant) => (
              <Pfp
                user={participant}
                size={50}
                key={participant.email}
                left="-20px"
              />
            ))}
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
          <div id="code-area">
            <div id="codeCreate">{tripCode}</div>
          </div>
        </div>
        {userRole != "participant" && (
          <button id="save" onClick={handleSaveTrip}>
            {userRole === "organizer" ? "Save" : "Join"}
          </button>
        )}
      </div>
      {showParticipants && (
        <ParticipantsWindow
          participants={participants}
          organizers={organizers}
          setShowParticipants={setShowParticipants}
          setShowProfile={setShowProfile}
        />
      )}
      {showProfile && (
        <ProfileTab
          user={showProfile}
          setShowProfile={setShowProfile}
          userRole={userRole}
          handleChangeRole={handleChangeRole}
          participants={participants}
          handleKickOut={handleKickOut}
          secondUser={currentUser}
        />
      )}
    </div>
  );
};

export default CreatePage;
