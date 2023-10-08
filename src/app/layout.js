"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Tabs />
        <div>{children}</div>
      </body>
    </html>
  );
}
