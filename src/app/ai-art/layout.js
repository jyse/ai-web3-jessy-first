"use client";
import React from "react";
import StarterPrompts from "../components/StarterPrompts";
import { useSearchParams } from "next/navigation";
import AIGridLayout from "../components/AIGridLayout";

const AIArtLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const defaultStyle = "characters";
  const chosenStyle = searchParams.get("style");

  return (
    <AIGridLayout>
      <StarterPrompts
        styleStarterPrompts={chosenStyle ? chosenStyle : defaultStyle}
      />
      {children}
    </AIGridLayout>
  );
};

export default AIArtLayout;
