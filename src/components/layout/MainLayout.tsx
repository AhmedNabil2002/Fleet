import React from "react";
import Navbar from "../navbar/Navbar";
import HeroSection from "../hero/HeroSection";

// src/components/layout/MainLayout.tsx

/*
 * MainLayout
 * ---------
 * Global layout containg Navbar and Footer
 */

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{/* <Outlet /> */}</main>
      <HeroSection />
    </div>
  );
};

export default MainLayout;
