"use client";
import React from "react";
import StarterPrompts from "../components/StarterPrompts";
import { usePathname } from "next/navigation";
import AIGridLayout from "../components/AIGridLayout";

const AIArtLayout = ({ children }) => {
  const pathName = usePathname();
  return (
    <AIGridLayout>
      <StarterPrompts
        style={pathName == "/ai-art" ? "/ai-art/stockphotos" : pathName}
      />
      {children}
    </AIGridLayout>
  );
};

export default AIArtLayout;
