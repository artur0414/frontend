import { ProtectedContext } from "@/app/dashboard/page";
import { useContext } from "react";

const Aside = () => {
  const { setEndSession } = useContext(ProtectedContext);

  const handleEndSession = () => {
    setEndSession(true);
  };

  return (
    <>
      <div className="w-[15%] h-screen border-r border-gray-800 flex flex-col items-center pt-8 pb-8 justify-between">
        <h1 className="text-white text-3xl font-thin">CacaoAPI</h1>
        <button
          onClick={handleEndSession}
          className="bg-red-500 hover:bg-red-600 text-white font-light py-2 px-4 rounded"
        >
          End Session
        </button>
      </div>
    </>
  );
};

export default Aside;
