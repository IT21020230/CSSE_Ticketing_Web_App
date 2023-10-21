import React from "react";
import SignUp from "../../components/client/signUp/signUp";
import HeaderOut from "../../components/Layout/HeaderOut";

const SignUpPage = () => {
  return (
    <main className="app">
      <HeaderOut />
      <div className="content">
        <SignUp />
      </div>
    </main>
  );
};

export default SignUpPage;
