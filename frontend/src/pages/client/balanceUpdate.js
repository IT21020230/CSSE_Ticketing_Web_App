import React from "react";
import Home from "../../components/client/home/home";
import BalanceUpdate from "../../components/client/balanceUpdate/balanceUpdate"
import Header from "../../components/Layout/Header";
import NavBar from "../../layout/NavBar";

const BalanceUpdatePagee = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <BalanceUpdate/>
      </div>
    </main>
  );
};

export default BalanceUpdatePagee;
