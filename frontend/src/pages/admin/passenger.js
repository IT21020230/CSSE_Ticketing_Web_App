import React from "react";
import Passenger from "../../components/admin/passengers/passengers";
import NavBar from "../../layout/NavBar";

const PassengerPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <Passenger />
      </div>
    </main>
  );
};

export default PassengerPage;
