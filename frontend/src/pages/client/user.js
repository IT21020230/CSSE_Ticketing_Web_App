import React from "react";
import User from "../../components/client/user/user";
import NavBar from "../../layout/NavBar";

const UserPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <User />
      </div>
    </main>
  );
};

export default UserPage;
