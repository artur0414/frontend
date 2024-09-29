import { ProtectedContext } from "@/app/dashboard/page";
import { useContext, useEffect } from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { user } = useContext(ProtectedContext);

  return (
    <>
      <header className="w-[80%] h-[10%] flex items-center gap-5 justify-end pr-8 border-b border-gray-800">
        <BellIcon className="w-5 h-5 text-white bg-white bg-opacity-50 rounded-full p-1" />
        <div className="flex items-center gap-2">
          <h2 className="text-white">{user}</h2>
          <button>
            <ChevronDownIcon className="w-5 text-white" />
          </button>
        </div>
      </header>
      <h1></h1>
    </>
  );
};

export default Header;
