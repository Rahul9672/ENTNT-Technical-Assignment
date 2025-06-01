import { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { getData } from "../../utils/localStorageUtils";

const JobForm = ({ open, onClose, jobs }) => {
  const { addJob, updateJob } = useJobs();

  const safeGetArray = (key) => {
    try {
      const data = getData(key);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return [];
    }
  };

  const ships = safeGetArray("ships");
  const components = safeGetArray("components");
  const engineers = safeGetArray("users").filter(
    (user) => user.role === "Engineer"
  );

  const [formData, setFormData] = useState({
    type: "",
    componentId: "",
    shipId: "",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    if (jobs) {
      setFormData({
        ...jobs,
        shipId: jobs.shipId?.toString() || "",
        componentId: jobs.componentId?.toString() || "",
        assignedEngineerId: jobs.assignedEngineerId?.toString() || "",
      });
    } else {
      setFormData({
        type: "",
        componentId: "",
        shipId: "",
        priority: "Medium",
        status: "Open",
        assignedEngineerId: "",
        scheduledDate: "",
      });
    }
  }, [jobs, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobs) {
      updateJob(jobs.id, formData);
      setSnackbarMessage("Job updated successfully!");
    } else {
      addJob(formData);
      setSnackbarMessage("Job added successfully!");
    }
    setOpenSnackbar(true);
    onClose();
  };

  const selectedShipId = formData.shipId?.toString();
  const filteredComponents = selectedShipId
    ? components.filter((comp) => comp.shipId === selectedShipId)
    : [];

  if (!open || ships.length === 0 || components.length === 0) return null; 

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 "
        onClick={onClose}
      />

      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
        aria-labelledby="job-form-title"
      >
        <div
          className="bg-[#fceeee] bg-opacity-70 text-black border border-gray-300 rounded-2xl opacity-70 w-[720px] max-w-lg h-[642px] px-9 py-4 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="job-form-title"
            className="text-center font-bold text-2xl  mt-2 "
          >
            Add New Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Ship Selector */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Ship Name</span>
              <select
                name="shipId"
                value={formData.shipId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Choose a ship
                </option>
                {ships.map((ship) => (
                  <option key={ship.id} value={ship.id}>
                    {ship.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Component Selector */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Component</span>
              <select
                name="componentId"
                value={formData.componentId}
                onChange={handleChange}
                required
                disabled={!formData.shipId}
                className={`mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  !formData.shipId ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled>
                  {formData.shipId
                    ? "Choose a component"
                    : "Select your ship"}
                </option>
                {filteredComponents.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Job Type */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Job Type</span>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            {/* Priority */}
            <label className="block">
              <span className="text-gray-900 font-semibold">Priority</span>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
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
                <option value="Open">Open</option>
                <option value="In Progress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            {/* Assigned Engineer */}
            <label className="block">
              <span className="text-gray-900 font-semibold">
                Assigned Engineer
              </span>
              <select
                name="assignedEngineerId"
                value={formData.assignedEngineerId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">UnAssigned</option>
                {engineers.map((eng) => (
                  <option key={eng.id} value={eng.id}>
                    {eng.email}
                  </option>
                ))}
              </select>
            </label>

            {/* Scheduled Date */}
            <label className="block">
              <span className="text-gray-900 font-semibold">
                Scheduled Date
              </span>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end space-x-5 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border border-indigo-900 text-indigo-900 rounded-md font-medium hover:bg-indigo-50 transition-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-900 text-white rounded-md font-medium hover:bg-indigo-800 transition-200"
              >
                {jobs ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Snackbar after update successfully*/}
      {openSnackbar && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white/70 px-6 py-3 rounded-md shadow-md">
            <div className="flex items-center justify-between space-x-4 min-w-[250px]">
              <p>{snackbarMessage}</p>
              <button
                onClick={() => setOpenSnackbar(false)}
                className="font-bold hover:text-gray-200"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobForm;
