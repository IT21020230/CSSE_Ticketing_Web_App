import React from "react";

import NavBar from "../../layout/NavBar";
import TimeTable from "../../components/client/user/timeTable";

const TimeTablePage = () => {
  return (
    <main className="app">
      <NavBar />
      <div className="content">
        <TimeTable />
      </div>
    </main>
  );
};

export default TimeTablePage;
