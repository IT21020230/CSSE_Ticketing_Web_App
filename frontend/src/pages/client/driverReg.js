import React from "react";
import DriverReg from "../../components/client/driverReg/driverReg";
import NavBar from "../../layout/NavBar";
import Header from "../../components/Layout/Header";

const DriverRegPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <DriverReg />
      </div>
    </main>
  );
};

export default DriverRegPage;
