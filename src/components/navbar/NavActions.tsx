import React from "react";
import UserMenu from "./UsrMenu";
import { Bell, Menu } from "lucide-react";

const NavActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Notification */}
      <button
        className="
          w-9 h-9
          flex items-center justify-center
          rounded-full
          hover:bg-gray-100
        "
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
      <button
        className="
          w-9 h-9
          flex items-center justify-center
          rounded-full
          hover:bg-gray-100
        "
      >
        <Bell className="w-5 h-5 text-gray-600" />
      </button>

      {/* User */}
      <UserMenu />
    </div>
  );
};

export default NavActions;
