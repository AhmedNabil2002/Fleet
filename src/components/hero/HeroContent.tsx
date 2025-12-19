// import React from "react";
// import HeroBadge from "./HeroBadge";
// import { MapPin } from "lucide-react";
// import HeroSocialProof from "./HeroSocialProof";
// import HeroActions from "./HeroActions";

// const HeroContent: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center text-center">
//       {/* Badge */}
//       <HeroBadge />
//       {/* Title */}
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 max-w-3xl leading-tight">
//         Find and book top doctors near your
//       </h1>

//       {/* Description */}
//       <p className="mt-4 text-gray-600 max-w-[340px] leading-relaxed">
//         Easily find top-rated specialists near you and book
//         appointments in just a few clicks. Whether you need
//         an in-person visit consultation, we’re here to connect
//         you with the right care—fast, simple, and secure.
//       </p>

//       {/* Location hint */}
//       <div className="flex flex-col mt-8 text-center justify-center text-sm text-gray-500 absolute left-0 -translate-x-1/2">
//         <MapPin className="w-4 h-4 text-blue-600" /> <br />
//        <p className="mt-1 text-xs ml-3 shadow py-2 px-3 pl-5 rounded-full">
//          Doctors near you
//        </p>
//       </div>

//       {/* Social proof */}
//       <HeroSocialProof />

//       {/* Actions */}
//       <HeroActions />
//     </div>
//   );
// };

// export default HeroContent;


import React from "react";
import { MapPin } from "lucide-react";
import HeroBadge from "./HeroBadge";
import HeroSocialProof from "./HeroSocialProof";
import HeroActions from "./HeroActions";

/**
 * HeroContent
 * -----------
 * Main hero section content.
 */
const HeroContent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Location hint */}
      <div className="absolute left-4 top-24 hidden lg:flex flex-col items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 text-blue-600 mt-8" />
        <span className="px-4 py-2 text-xs bg-white shadow rounded-full">
          Doctors near you
        </span>
      </div>

      {/* Badge */}
      <HeroBadge />

      {/* Title */}
      <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 max-w-3xl leading-tight">
        Find and book top doctors near you
      </h1>

      {/* Description */}
      <p className="mt-5 text-gray-600 max-w-xl leading-relaxed">
        Easily find top-rated specialists near you and book
        appointments in just a few clicks. Whether you need
        an in-person visit consultation, we’re here to connect
        you with the right care—fast, simple, and secure.
      </p>

      {/* Social proof */}
      <HeroSocialProof />

      {/* Actions */}
      <HeroActions />
    </div>
  );
};

export default HeroContent;