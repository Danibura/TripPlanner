import React from "react";
import "../pages/css/participants.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pfp from "./Pfp";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
const ParticipantsWindow = ({
  organizers,
  participants,
  setShowParticipants,
  setShowProfile,
  isMobile,
  setHideTab,
}) => {
  const [hide, setHide] = useState(false);
  const [uOrganizers, setUOrganizers] = useState([]);
  const [uParticipants, setUParticipants] = useState([]);
  const closeParticipants = () => {
    setHide(true);
    setTimeout(() => setShowParticipants(false), 500);
  };
  const { findUser } = useAuth();
  const loadOrganisers = async () => {
    const updatedOrganizers = await Promise.all(
      organizers.map(async (organizer) => {
        console.log(organizer.email);
        const updatedUser = await findUser(organizer.email);
        console.log("Trovato organizer", updatedUser);
        return updatedUser.data;
      })
    );
    setUOrganizers(updatedOrganizers);
  };
  const loadParticipants = async () => {
    const updatedParticipants = await Promise.all(
      participants.map(async (participant) => {
        const updatedUser = await findUser(participant.email);
        return updatedUser.data;
      })
    );
    console.log(updatedParticipants);
    setUParticipants(updatedParticipants);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadOrganisers();
      loadParticipants();
    }, 1000);

    // Cleanup per evitare memory leak o più timer
    return () => clearInterval(intervalId);
  }, [organizers, participants]);
  return (
    <div id="participants-window" className={hide ? "hidden" : ""}>
      {uOrganizers?.map((organizer) => (
        <Pfp
          key={organizer.email}
          user={organizer}
          size={isMobile ? 50 : 80}
          left={isMobile ? 10 : 40}
          top={isMobile ? 0 : 20}
          name={organizer.name}
          color="rgb(33, 136, 19)"
          setShowProfile={setShowProfile}
          setHideTab={setHideTab}
          isMobile={isMobile}
        />
      ))}
      {uParticipants?.map((participant) => (
        <Pfp
          key={participant.email}
          user={participant}
          size={isMobile ? 50 : 80}
          left={isMobile ? 10 : 40}
          top={isMobile ? 0 : 20}
          name={participant.name}
          setShowProfile={setShowProfile}
          setHideTab={setHideTab}
          isMobile={isMobile}
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
