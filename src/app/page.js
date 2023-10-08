"use client";
import GridLayout from "./components/GridLayout";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./overview/page";

export default function Home() {
  return (
    <GridLayout>
      <Sidebar route="/" />
      <OverviewPage />
    </GridLayout>
  );
}
