import React from "react";
import User from "../../components/client/user/user";
import NavBar from "../../layout/NavBar";
import Header from "../../components/Layout/Header";

const UserPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <User />
      </div>
    </main>
  );
};

export default UserPage;
