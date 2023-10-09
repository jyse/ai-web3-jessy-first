"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          <Tabs />
          <div>{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
