import React from "react";
import Home from "../../components/client/home/home";
import NavBar from "../../layout/NavBar";
import Header from "../../components/Layout/Header";
const HomePage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <Home />
      </div>
    </main>
  );
};

export default HomePage;
