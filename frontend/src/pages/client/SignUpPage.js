import React from "react";
import SignUp from "../../components/client/SignUp/SignUp";
import Header from "../../components/Layout/Header";

const SignUpPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <SignUp />
      </div>
    </main>
  );
};

export default SignUpPage;
