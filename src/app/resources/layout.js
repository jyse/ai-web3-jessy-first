import React from "react";
import Sidebar from "../components/Sidebar";
import GridLayout from "../components/GridLayout";

const ResourcesLayout = ({ children }) => {
  return (
    <GridLayout>
      <Sidebar route="/resources" />
      {children}
    </GridLayout>
  );
};

export default ResourcesLayout;
