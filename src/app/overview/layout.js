import React from "react";
import GridLayout from "../components/GridLayout";
import Sidebar from "../components/Sidebar";

const OverviewLayout = ({ children }) => {
  return (
    <GridLayout>
      <Sidebar route="/" />
      {children}
    </GridLayout>
  );
};

export default OverviewLayout;
