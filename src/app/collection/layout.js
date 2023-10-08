import React from "react";
import GridLayout from "../components/GridLayout";
import Sidebar from "../components/Sidebar";

const CollectionLayout = ({ children }) => {
  return (
    <GridLayout>
      <Sidebar route="/collections" />
      {children}
    </GridLayout>
  );
};

export default CollectionLayout;
