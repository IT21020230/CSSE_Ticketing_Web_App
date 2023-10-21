import React, { useState } from "react";

function ViewBusJouneys() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const districts = ["Colombo", "Gampaha", "Kandy"];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSearch = () => {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    ></div>
  );
}

export default ViewBusJouneys();
