import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./css/calendar.css";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../store/useAuth";
import { useTripStore } from "../store/trip";
import { jwtDecode } from "jwt-decode";
import HomeLink from "../components/HomeLink";
import { useParams } from "react-router-dom";

const CalendarPage = () => {
  const { calendarCode } = useParams();
  const { findUserByCalendar } = useAuth();
  const { getTripByCode } = useTripStore();
  const [currentUser, setCurrentUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const isMobile = window.innerWidth < 1200;
  const fetchUserTrips = async (user) => {
    if (!user) return;
    const accessCodes = user.trips;
    var newTrips = [];
    for (let i = 0; i < accessCodes.length; i++) {
      const res = await getTripByCode(accessCodes[i].trim());
      const trip = res.data;
      newTrips = [...newTrips, trip];
    }
    setTrips(newTrips);
    return newTrips;
  };

  //Finds user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await findUserByCalendar(calendarCode);
      const user = res.data;
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  //Finds trips
  useEffect(() => {
    fetchUserTrips(currentUser);
  }, [currentUser]);

  const tripEvents = trips.map((trip) => ({
    title: trip.destination,
    start: trip.departureDate,
    end: trip.returnDate,
    url: `/create/${trip.accessCode}`,
    displayEventEnd: true,
  }));

  return (
    <div id="calendarPage">
      {!isMobile && <HomeLink />}
      <div id="calendar-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={tripEvents}
          height="auto"
          headerToolbar={{
            left: !isMobile ? "prev,next today" : "prev,next",
            center: "title",
            right: !isMobile ? "dayGridMonth, timeGridWeek, timeGridDay" : "",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
