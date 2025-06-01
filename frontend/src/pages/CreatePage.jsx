import React, { useEffect, useState } from "react";
import "./css/create.css";
import { useTripStore } from "../store/trip";
const CreatePage = () => {
  // State to hold the generated code
  const [accessCode, setAccessCode] = useState("");
  const selectedCode = useTripStore((state) => state.selectedCode);
  const [newTrip, setNewTrip] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    accessCode: "",
    usefulInfo: "",
  });

  const { createTrip } = useTripStore();
  const handleAddTrip = async () => {
    const { success, message } = await createTrip(newTrip);
    console.log(newTrip);
    console.log("Success: ", success);
    console.log("Message: ", message);
  };
  const { fetchTrips, trips } = useTripStore();
  console.log(trips);
  useEffect(() => {
    fetchTrips();

    // Generate random access code once on mount
    const code = selectedCode || parseInt(Math.random() * 100000000);
    setAccessCode(code.toString());
    setNewTrip({ ...newTrip, accessCode: code.toString() });

    window.initMap = function () {
      let map;
      let marker;
      let geocoder;
      let autocomplete;

      geocoder = new window.google.maps.Geocoder();

      map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 41.9028, lng: 12.4964 }, // Roma
      });

      const input = document.getElementById("destination");
      autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.setTypes(["(cities)"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          alert("No details available for input: '" + place.name + "'");
          return;
        }

        const location = place.geometry.location;
        map.setCenter(location);
        map.setZoom(13);

        if (marker) marker.setMap(null);
        marker = new window.google.maps.Marker({
          map: map,
          position: location,
        });
      });
    };

    // ✅ Solo dopo definiamo lo script e lo appendiamo
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUXakG6rMSMpscP9U9UTMguvyBvh8LnY&libraries=places&callback=initMap";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // Se già caricato
      window.initMap();
    }

    return () => {
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    const match = trips.find((trip) => trip.accessCode === selectedCode);
    if (match) {
      console.log(match);
      setNewTrip({ ...match });
    }
  }, [trips, selectedCode]);

  function addActivity() {
    const addButton = document.getElementById("add-activity");
    addButton.remove();
    const node = document.createElement("textarea");
    const textnode = document.createTextNode("");
    node.appendChild(textnode);
    node.style.backgroundColor = "#ffffff";
    node.style.borderRadius = "10px";
    node.style.padding = "10px";
    node.style.width = "90%";
    node.style.marginBottom = "15px";
    document.getElementById("box-activities").appendChild(node);
    document.getElementById("box-activities").appendChild(addButton);
  }

  return (
    <div id="creaPagina">
      <div id="blur">
        <input
          id="destination"
          placeholder="Destination"
          name="destination"
          value={newTrip.destination}
          onChange={(e) =>
            setNewTrip({ ...newTrip, destination: e.target.value })
          }
        />
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

      <div id="map"></div>

      <div id="bottom-right-corner">
        <div id="box-code">
          <label id="code-title">Access code</label>
          <br />
          <textarea id="code-area" value={accessCode} readOnly />
        </div>
        <button id="save" onClick={handleAddTrip}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
