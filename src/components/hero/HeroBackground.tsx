import heroBackground from '../../assets/Group 8.png'

// /*
//  * HeroBackground
//  * --------- 
//  * Decorative hero background cilrcles (from Figma)
//  */
const HeroBackground: React.FC = () => {
  return (
    <img
      src={heroBackground}
      alt="Hero background"
      className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[900px]
        max-w-none
        opacity-70
        pointer-events-none
      "
    />
  );
};

export default HeroBackground;