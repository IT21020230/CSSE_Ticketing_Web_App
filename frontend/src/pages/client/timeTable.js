import React from "react";
import Header from "../../components/Layout/Header";
import NavBar from "../../layout/NavBar";
import TimeTable from "../../components/client/user/timeTable";

const TimeTablePage = () => {
  return (
    <main className="app">
      <Header />
      <div className="content">
        <TimeTable />
      </div>
    </main>
  );
};

export default TimeTablePage;
