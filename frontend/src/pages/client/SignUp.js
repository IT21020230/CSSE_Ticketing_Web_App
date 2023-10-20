import React from "react";
import SignUp from "../../components/client/SignUp/SignUp";
import NavBar from "../../layout/NavBar";

const SignUnPage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <SignUp />
      </div>
    </main>
  );
};

export default SignUnPage;
