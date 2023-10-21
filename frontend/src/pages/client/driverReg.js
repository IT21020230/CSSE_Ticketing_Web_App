import React from "react";
import DriverReg from "../../components/client/driverReg/driverReg";
import NavBar from "../../layout/NavBar";

const DriverRegPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <DriverReg />
      </div>
    </main>
  );
};

export default DriverRegPage;
