import { useState } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import ShipForm from "./ShipForm";
import HighlightText from "../core/HighlightText";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import { TbView360 } from "react-icons/tb";

const ShipList = ({ filterFlag }) => {
  const { ships, loading, deleteShip } = useShips();
  const { user } = useAuth();

  const [openForm, setOpenForm] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredShips = filterFlag
    ? ships.filter((ship) => ship.flag === filterFlag)
    : ships;

  const handleEdit = (ship) => {
    setSelectedShip(ship);
    setOpenForm(true);
  };

  const handleFormClose = (wasSuccessful) => {
    setOpenForm(false);
    setSelectedShip(null);
    if (wasSuccessful) {
      setSnackbarMessage(wasSuccessful);
      setSnackbarOpen(true);
    }
  };

  const handleAdd = () => {
    setSelectedShip(null);
    setOpenForm(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  if (loading)
    return <p className="text-center py-8 text-gray-700">Loading ships...</p>;

  return (
    <div className="relative w-full min-h-screen mt-10 ml-24">
      <div className="p-4 w-11/12 z-10 relative px-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold">
            <HighlightText text="Ship List" />
          </h2>
          {user?.role !== "Inspector" && (
            <button
              onClick={handleAdd}
              className="flex items-center translate-x-[-95px] gap-2 bg-indigo-900 hover:bg-indigo-800 text-white/70 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              aria-label="Add Ship"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Ship
            </button>
          )}
        </div>

        {/* Form Modal */}
        <ShipForm
          key={selectedShip?.id || "new"}
          open={openForm}
          onClose={handleFormClose}
          ship={selectedShip}
          onSubmitSuccess={handleFormClose}
        />

        {/* Table */}
        <div className="text-black overflow-x-auto w-11/12 bg-white/70 rounded-lg shadow-md border border-richblack-300">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-300 text-black text-xl">
              <tr>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Name
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  IMO Number
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Flag
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Status
                </th>
                <th className="py-3 px-6 text-center border-richblack-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredShips.map((ship) => (
                <tr
                  key={ship.id}
                  className="border-b last:border-b-0 transition-colors hover:bg-gray-100"
                >
                  {/* Name */}
                  <td className="py-3 px-6 border-r border-black/20 text-center text-black">
                    {ship.name}
                  </td>

                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {ship.imo}
                  </td>
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {ship.flag}
                  </td>
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {ship.status}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-6 flex items-center justify-center gap-4 border-black/20 text-center">
                    {/* View Button */}
                    <Link
                      to={`/ships/${ship.id}`}
                      className="text-sky-700 hover:text-sky-900"
                      aria-label="View Ship"
                    >
                      <TbView360 size={20} />
                    </Link>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(ship)}
                      className="text-indigo-900"
                      aria-label="Edit Ship"
                    >
                      <HiOutlinePencil size={18} />
                    </button>

                    {/* Delete Button (Only for Admin) */}
                    {user?.role === "Admin" && (
                      <button
                        onClick={() => deleteShip(ship.id)}
                        className="text-red-800"
                        aria-label="Delete Ship"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Snackbar after update succesfully */}
        {snackbarOpen && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
            <div className="flex justify-between items-center space-x-4">
              <p>{snackbarMessage}</p>
              <button
                onClick={handleSnackbarClose}
                className="font-bold hover:text-green-200"
                aria-label="Close Snackbar"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Animations */}
        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.5s ease forwards;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ShipList;
