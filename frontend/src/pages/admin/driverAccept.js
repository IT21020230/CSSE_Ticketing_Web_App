import React from "react";
import DriverAccept from "../../components/admin/driverAccept/driverAccept";
import NavBar from "../../layout/NavBar";

const DriverAcceptPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <DriverAccept />
      </div>
    </main>
  );
};

export default DriverAcceptPage;
