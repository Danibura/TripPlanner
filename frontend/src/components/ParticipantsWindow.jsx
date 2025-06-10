import React from "react";
import "../pages/css/participants.css";
import { Link } from "react-router-dom";
import Pfp from "./Pfp";
const ParticipantsWindow = ({
  organizers,
  participants,
  setShowParticipants,
}) => {
  return (
    <div id="participants-window">
      {organizers.map((organizer) => (
        <Pfp
          num={organizer.pfp}
          size={80}
          left="40px"
          name={organizer.name}
          key={organizer.email}
          color="rgb(33, 136, 19)"
        />
      ))}
      {participants.map((participant) => (
        <Pfp
          num={participant.pfp}
          size={80}
          left="40px"
          name={participant.name}
          key={participant.email}
        />
      ))}
      <button
        onClick={() => {
          setShowParticipants(false);
        }}
        className="material-symbols-outlined"
        id="close-participants"
      >
        close
      </button>
    </div>
  );
};

export default ParticipantsWindow;
