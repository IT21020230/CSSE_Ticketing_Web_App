import React from "react";
import Header from "../../components/Layout/Header";
import NavBar from "../../layout/NavBar";
import ViewBusJourneys from "../../components/admin/viewBusJourneys";

const ViewBusJourneysPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <ViewBusJourneys />
      </div>
    </main>
  );
};

export default ViewBusJourneysPage;