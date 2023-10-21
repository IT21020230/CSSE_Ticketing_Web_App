import React from "react";
import DriverAccept from "../../components/admin/driverAccept/driverAccept";
import NavBar from "../../layout/NavBar";
import Header from "../../components/Layout/Header";

const DriverAcceptPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <DriverAccept />
      </div>
    </main>
  );
};

export default DriverAcceptPage;
