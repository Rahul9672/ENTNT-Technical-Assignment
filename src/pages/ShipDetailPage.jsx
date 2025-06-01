import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../utils/localStorageUtils";
import ComponentList from "../components/Components/ComponentList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [currentShip, setCurrentShip] = useState(null);

  useEffect(() => {
    const ships = getData("ships") || [];
    const found = ships.find((ship) => ship.id === id);
    setCurrentShip(found);
  }, [id]);

  if (!currentShip) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Ship not found
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-6">
      <div className="flex justify-end mb-6">
        <Link
          to="/ships"
          className="bg-indigo-900 hover:bg-indigo-800 text-white/70 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          ← Back to Ships
        </Link>
      </div>

      {/* Custom Grid Layout with Controlled Sizes */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-[5%]">
        {/* Left Card */}
        <div className="w-[35%] h-[35%] bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-glass text-white space-y-4  ">
          <h1 className="text-2xl text-black hover:text-yellow-300 font-bold text-center">
            {currentShip.name}
          </h1>
          <p className="gap-x-4 text-white/70 ">
            <span className="text-gray-800 font-semibold ">IMO Number:</span>{" "}
            {currentShip.imo}
          </p>
          <p className="gap-x-4 text-white/70 ">
            <span className="text-gray-800 font-semibold">Flag:</span>{" "}
            {currentShip.flag}
          </p>
          <p>
            <span className="text-gray-800 font-semibold">Status:</span>{" "}
            <span
              className={
                currentShip.status === "Active"
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold"
              }
            >
              {currentShip.status}
            </span>
          </p>
        </div>

        {/* Right Card */}
        <div className="w-[65%]  max-h-[500px] md:max-h-[500px] overflow-y-hidden mb-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-glass text-white">
          {/* Tabs */}
          <div className="border-b border-gray-400 mb-4 text-2xl flex">
            <button
              onClick={() => setTabValue(0)}
              className={`py-2 px-4 font-semibold border-b-2 ${
                tabValue === 0
                  ? "border-yellow-200 text-yellow-300 font-semibold text-2xl"
                  : "border-transparent text-white/70 hover:text-blue-300"
              }`}
            >
              Components
            </button>
            <button
              onClick={() => setTabValue(1)}
              className={`ml-4 py-2 px-4 font-semibold border-b-2 ${
                tabValue === 1
                  ? "border-yellow-100 text-yellow-300 font-semibold text-2xl"
                  : "border-transparent text-white/60 hover:text-blue-300"
              }`}
            >
              Maintenance History
            </button>
          </div>

          {/* Tab Panels */}
          {tabValue === 0 && (
            <div>
              <h2 className="text-lg text-gray-700 font-bold mb-2">
                Maintenance Components
              </h2>
              <ComponentList shipId={id} />
            </div>
          )}

          {tabValue === 1 && (
            <div className="text-white/80 mt-4">
              <p className="text-lg text-gray-700 font-bold mb-2">
                Maintenance history will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipDetailPage;
