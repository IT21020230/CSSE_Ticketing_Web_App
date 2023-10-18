import React from "react";
import Home from "../../components/client/home/home";
import NavBar from "../../layout/NavBar";

const HomePage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <Home />
      </div>
    </main>
  );
};

export default HomePage;
