import React from "react";
import SignIn from "../../components/client/signIn/signIn";
import HeaderOut from "../../components/Layout/HeaderOut";

const SignInPage = () => {
  return (
    <main className="app">
      <HeaderOut />
      <div className="content">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
