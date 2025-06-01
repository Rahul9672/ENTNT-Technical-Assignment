import { useState, useEffect } from 'react';
import { useComponents } from '../../contexts/ComponentsContext';
import { getData } from '../../utils/localStorageUtils';

const ComponentForm = ({ open, onClose, component, shipId }) => {
  const { addComponent, updateComponent } = useComponents();
  const ships = getData('ships') || [];

  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId: shipId || ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (!open) return;

    if (component) {
      setFormData(component);
    } else {
      setFormData({
        name: '',
        serialNumber: '',
        installDate: '',
        lastMaintenanceDate: '',
        shipId: shipId || ''
      });
    }
  }, [component, shipId, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (component) {
      updateComponent(component.id, formData);
      setSnackbarMessage("Component updated successfully!");
    } else {
      addComponent(formData);
      setSnackbarMessage("Component added successfully!");
    }
    setOpenSnackbar(true);
    onClose(false);
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => onClose(false)}
      />

      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="bg-[#fceeee] bg-opacity-70 text-black border border-gray-300 rounded-2xl opacity-70 w-[720px] max-w-lg h-auto px-9 py-4 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center font-bold text-2xl mt-2">
            {component ? 'Edit Component' : 'Add New Component'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2 mt-4">
            {!shipId && (
              <label className="block">
                <span className="text-gray-900 font-semibold">Ship Name</span>
                <select
                  name="shipId"
                  value={formData.shipId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>Select a ship</option>
                  {ships.map(ship => (
                    <option key={ship.id} value={ship.id}>{ship.name}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className="text-gray-900 font-semibold">Component Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-900 font-semibold">Serial Number</span>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-900 font-semibold">Installation Date</span>
              <input
                type="date"
                name="installDate"
                value={formData.installDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-900 font-semibold">Last Maintenance Date</span>
              <input
                type="date"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <div className="flex justify-end space-x-5 pt-4">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-3 py-1 border border-indigo-900 text-indigo-900 rounded-md font-medium hover:bg-indigo-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-900 text-white rounded-md font-medium hover:bg-indigo-800 transition"
              >
                {component ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Snackbar after update succesfully*/}
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

export default ComponentForm;
