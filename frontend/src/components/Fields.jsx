import React from "react";
import "../pages/css/fields.css";
const Fields = ({ showCountry = false }) => {
  return (
    <div id="fields">
      <div id="destinationTitle">Destination</div>
      <div id="departureDateTitle">Departure date</div>
      <div id="returnDateTitle">Return date</div>
      {showCountry && (
        <div id="participantsCountryTitle">Participants country</div>
      )}
    </div>
  );
};

export default Fields;
