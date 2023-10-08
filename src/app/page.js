"use client";
import GridLayout from "./components/GridLayout";
import Sidebar from "./components/Sidebar";
import Welcome from "./overview/page";

export default function Home() {
  return (
    <GridLayout>
      <Sidebar route="/" />
      <Welcome />
    </GridLayout>
  );
}
