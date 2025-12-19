import { Search } from "lucide-react";

const SearchInput: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

      <input
        type="text"
        placeholder="Search about specialty, doctor"
        className="
          w-full
          h-10
          rounded-xl
          bg-gray-50
          border border-gray-200
          pl-11 pr-4
          text-sm
          placeholder-gray-400
          focus:outline-none
          focus:ring-1 focus:ring-blue-500
        "
      />
    </div>
  );
};

export default SearchInput;