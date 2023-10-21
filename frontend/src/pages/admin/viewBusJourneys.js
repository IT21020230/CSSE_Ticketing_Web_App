import React from "react";

import NavBar from "../../layout/NavBar";
import ViewBusJourneys from "../../components/admin/viewBusJourneys";

const PassengerPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <ViewBusJourneys />
      </div>
    </main>
  );
};

export default PassengerPage;