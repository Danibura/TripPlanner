import React from "react";
import "../pages/css/participants.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pfp from "./Pfp";
const ParticipantsWindow = ({
  organizers,
  participants,
  setShowParticipants,
  setShowProfile,
}) => {
  const [hide, setHide] = useState(false);
  const closeParticipants = () => {
    setHide(true);
    setTimeout(() => setShowParticipants(false), 500);
  };
  return (
    <div id="participants-window" className={hide ? "hidden" : ""}>
      {organizers.map((organizer) => (
        <Pfp
          user={organizer}
          size={80}
          left={40}
          top={20}
          name={organizer.name}
          key={organizer.email}
          color="rgb(33, 136, 19)"
          setShowProfile={setShowProfile}
        />
      ))}
      {participants.map((participant) => (
        <Pfp
          user={participant}
          size={80}
          left={40}
          top={20}
          name={participant.name}
          key={participant.email}
          setShowProfile={setShowProfile}
        />
      ))}
      <button
        onClick={closeParticipants}
        className="material-symbols-outlined"
        id="close-participants"
      >
        close
      </button>
    </div>
  );
};

export default ParticipantsWindow;
