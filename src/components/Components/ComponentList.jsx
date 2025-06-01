import { useState } from "react";
import { useComponents } from "../../contexts/ComponentsContext";
import { useAuth } from "../../contexts/AuthContext";
import { getData } from "../../utils/localStorageUtils";
import { Link } from "react-router-dom";
import ComponentForm from "./ComponentForm";
import HighlightText from "../core/HighlightText";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";

const ComponentList = ({ shipId }) => {
  const { components, loading, deleteComponent } = useComponents();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredComponents = shipId
    ? components.filter((comp) => comp.shipId === shipId)
    : components;

  const handleEdit = (component) => {
    setSelectedComponent(component);
    setOpenForm(true);
  };

  const handleFormClose = (wasSuccessful) => {
    setOpenForm(false);
    setSelectedComponent(null);
    if (wasSuccessful) {
      setSnackbarMessage("Component added successfully!");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  if (loading)
    return (
      <p className="text-center py-8 text-gray-700">Loading components...</p>
    );

  return (
    <div className="relative w-full min-h-screen">
      <div className="p-4 w-full z-10 relative">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold">
            <HighlightText text="Ship Components" />
          </h2>
          {!shipId && user?.role !== "Inspector" && (
            <button
              onClick={() => {
                setSelectedComponent(null);
                setOpenForm(true);
              }}
              className="flex items-center translate-x-[-95px] gap-2 bg-indigo-900 hover:bg-indigo-800 text-white/70 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              aria-label="Add Component"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Component
            </button>
          )}
        </div>

        <ComponentForm
          key={selectedComponent?.id || "new"}
          open={openForm}
          onClose={handleFormClose}
          component={selectedComponent}
          shipId={shipId}
        />

        <div className="text-black w-full bg-white/70 rounded-lg shadow-md border border-richblack-300">
          <table className="w-full table-auto">
            <thead className="bg-indigo-300 text-black text-xl">
              <tr>
                {!shipId && (
                  <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                    Ship
                  </th>
                )}
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Name
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Serial Number
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Install Date
                </th>
                <th className="py-3 px-6 border-r-2 text-center border-richblack-300 font-semibold">
                  Last Maintenance
                </th>
                <th className="py-3 px-6 text-center border-richblack-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComponents.map((component) => (
                <tr
                  key={component.id}
                  className="border-b last:border-b-0 transition-colors hover:bg-gray-100"
                >
                  {!shipId && (
                    <td className="py-3 px-6 border-r border-black/20 text-blue-600 hover:underline text-center">
                      <Link to={`/ships/${component.shipId}`}>
                        {getData("ships").find((s) => s.id === component.shipId)
                          ?.name || component.shipId}
                      </Link>
                    </td>
                  )}
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {component.name}
                  </td>
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {component.serialNumber}
                  </td>
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {component.installDate}
                  </td>
                  <td className="py-3 px-6 border-r border-black/20 text-center">
                    {component.lastMaintenanceDate}
                  </td>
                  <td className="py-3 px-6 flex items-center justify-center gap-4 border-black/20 text-center">
                    <button
                      onClick={() => handleEdit(component)}
                      className="text-indigo-900"
                      aria-label="Edit Component"
                    >
                      <HiOutlinePencil size={18} />
                    </button>
                    {user?.role === "Admin" && (
                      <button
                        onClick={() => deleteComponent(component.id)}
                        className="text-red-800"
                        aria-label="Delete Component"
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

        {/* Snackbar after update successfully */}
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
      </div>
    </div>
  );
};

export default ComponentList;
