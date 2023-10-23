import React from "react";
import DriverReq from "../../components/client/driverReq/driverReq";
import Header from "../../components/Layout/Header";

const HomePage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <DriverReq />
      </div>
    </main>
  );
};

export default HomePage;
