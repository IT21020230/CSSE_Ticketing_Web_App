import React from "react";
import Home from "../../components/client/home/home";
import BalanceUpdate from "../../components/client/balanceUpdate/balanceUpdate"
import NavBar from "../../layout/NavBar";

const HomePage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <BalanceUpdate/>
      </div>
    </main>
  );
};

export default HomePage;
