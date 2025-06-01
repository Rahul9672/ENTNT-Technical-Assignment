import { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";

const ShipForm = ({ open, onClose, ship, onSubmitSuccess }) => {
  const { addShip, updateShip } = useShips();
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (ship) {
      setFormData(ship);
    } else {
      setFormData({
        name: "",
        imo: "",
        flag: "",
        status: "Active",
      });
    }
  }, [ship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ship) {
        await updateShip(ship.id, formData);
        onSubmitSuccess("Ship successfully updated");
      } else {
        await addShip(formData);
        onSubmitSuccess("Ship successfully added");
      }
      onClose();
    } catch (error) {
      console.error("Error submitting ship:", error);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
        aria-labelledby="ship-form-title"
      >
        <div
          className="bg-[#fceeee] bg-opacity-70 text-black border border-gray-300 rounded-2xl opacity-70 w-[710px] max-w-lg h-[490px] px-9 py-6 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="ship-form-title"
            className="text-center font-bold text-2xl mt-2"
          >
            {ship ? "Edit Ship" : "Add New Ship"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Name */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Ship Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter ship name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            {/* IMO */}
            <label className="block">
              <span className="text-gray-900 font-semibold">IMO Number</span>
              <input
                type="text"
                name="imo"
                value={formData.imo}
                onChange={handleChange}
                required
                placeholder="Enter IMO number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            {/* Flag */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Flag</span>
              <input
                type="text"
                name="flag"
                value={formData.flag}
                onChange={handleChange}
                required
                placeholder="Enter flag"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            {/* Status */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            {/* Buttons */}
            <div className="flex justify-end space-x-5 pt-4">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-3 py-1 border border-indigo-900 text-indigo-900 rounded-md font-medium hover:bg-indigo-50 transition-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-900 text-white rounded-md font-medium hover:bg-indigo-800 transition-200"
              >
                {ship ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShipForm;
