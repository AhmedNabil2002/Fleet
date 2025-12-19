import React from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";


const HeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center  min-h-[80vh] overflow-hidden">
      {/* HeroBackground  Circles */}
      <HeroBackground />

      {/* HeroContent */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <HeroContent />

      </div>
    </section>
  );
};

export default HeroSection;
