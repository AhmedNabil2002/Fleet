// src/components/navbar/Navbar.tsx
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import NavActions from "./NavActions";
/**
 * Navbar
 * ------
 * Styled to match Figma:
 * - Centered container
 * - Soft background
 * - Card-like appearance
 */
const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-transparent  border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 pt-3">
        <div
          className="
            flex items-center justify-between
            h-16
            rounded-2xl
            bg-white
            px-6
          "
        >
          {/* Left */}
          <Logo />

          {/* Center */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <SearchInput />
          </div>

          {/* Right */}
          <NavActions />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
