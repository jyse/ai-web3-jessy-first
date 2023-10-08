"use client";
import React from "react";
import StarterPrompts from "../components/StarterPrompts";
import { usePathname } from "next/navigation";
import AIGridLayout from "../components/AIGridLayout";
import AIGenerator from "../components/AIGenerator";

const AIArtGenMainLayout = ({ children }) => {
  const pathName = usePathname();
  console.log(pathName, " what is in pathName? ");
  return (
    <AIGridLayout>
      <StarterPrompts
        style={pathName == "/ai-art" ? "/ai-art/stockphotos" : pathName}
      />
      <AIGenerator />
    </AIGridLayout>
  );
};

export default AIArtGenMainLayout;
