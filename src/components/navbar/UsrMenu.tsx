import React from "react";
import { User } from "lucide-react";

const UserMenu: React.FC = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer ">
            <button
        className="
          w-9 h-9
          flex items-center justify-center
          rounded-full
          hover:bg-gray-100
        "
      >
        <User className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default UserMenu;