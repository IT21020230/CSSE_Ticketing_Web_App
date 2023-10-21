import React from "react";
import SubscriptionPlan from "../../components/client/Subscription/SubscriptionPlan";
import NavBar from "../../layout/NavBar";
import Header from "../../components/Layout/Header";
const SubscriptionPlanPage = () => {
  return (
    <main>
      <Header />
      <div style={{ marginTop: "00em" }}>
        <SubscriptionPlan />
      </div>
    </main>
  );
};

export default SubscriptionPlanPage;
