import React from "react";
import GridLayout from "../components/GridLayout";
import Sidebar from "../components/Sidebar";

const MarketPlaceLayout = () => {
  return (
    <GridLayout>
      <Sidebar route="" />
      {children}
    </GridLayout>
  );
};

export default MarketPlaceLayout;
