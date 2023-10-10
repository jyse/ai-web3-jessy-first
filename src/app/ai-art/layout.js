"use client";
import React from "react";
import StarterPrompts from "../components/StarterPrompts";
import { useSearchParams } from "next/navigation";
import AIGridLayout from "../components/AIGridLayout";

const AIArtLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const chosenStyle = searchParams.get("style");

  return (
    <AIGridLayout>
      <StarterPrompts chosenStyle={chosenStyle} />
      {children}
    </AIGridLayout>
  );
};

export default AIArtLayout;
