import React from "react";
import SignIn from "../../components/client/SignIn/SignIn";
import Header from "../../components/Layout/Header";

const SignInPage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
