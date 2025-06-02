import React, { useEffect, useState } from "react";
import "./css/create.css";
import { useTripStore } from "../store/trip";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

const CreatePage = () => {
  const { tripCode } = useParams();

  const [newTrip, setNewTrip] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    accessCode: "",
    usefulInfo: "",
  });

  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { createTrip, fetchTrips, trips } = useTripStore();

  const handleAddTrip = async () => {
    const { success, message } = await createTrip(newTrip);
    console.log("Saved:", newTrip, success, message);
  };

  useEffect(() => {
    fetchTrips();
    setNewTrip((prev) => ({ ...prev, accessCode: tripCode.toString() }));
  }, []);

  useEffect(() => {
    const match = trips.find((trip) => trip.accessCode === tripCode);
    if (match) {
      setNewTrip({ ...match });

      provider.search({ query: match.destination }).then((results) => {
        if (results && results.length > 0) {
          const { x, y } = results[0];
          setCoords([y, x]);
        }
      });
    }
  }, [trips, tripCode]);

  const updateMapFromDestination = (destination) => {
    if (!destination) return;
    provider.search({ query: destination }).then((results) => {
      if (results && results.length > 0) {
        setSuggestions(results);
        const { x, y } = results[0]; // x = lon, y = lat
        setCoords([y, x]);
      }
    });
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setNewTrip((prev) => ({ ...prev, destination: value }));
  };

  const handleDestinationBlur = () => {
    updateMapFromDestination(newTrip.destination);
  };

  const handleDestinationKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita invio form
      updateMapFromDestination(newTrip.destination);
    }
  };

  const addActivity = () => {
    const addButton = document.getElementById("add-activity");
    addButton.remove();
    const node = document.createElement("textarea");
    node.style.backgroundColor = "#ffffff";
    node.style.borderRadius = "10px";
    node.style.padding = "10px";
    node.style.width = "90%";
    node.style.marginBottom = "15px";
    document.getElementById("box-activities").appendChild(node);
    document.getElementById("box-activities").appendChild(addButton);
  };

  return (
    <div id="creaPagina">
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
        <button id="save" onClick={handleAddTrip}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
