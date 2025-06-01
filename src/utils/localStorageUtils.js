export const initializeData = () => {
  if (!localStorage.getItem("users")) {
    const initialData = {
      users: [
        {
          id: "1",
          role: "Admin",
          email: "admin@entnt.in",
          password: "admin123",
        },
        {
          id: "2",
          role: "Inspector",
          email: "inspector@entnt.in",
          password: "inspect123",
        },
        {
          id: "3",
          role: "Engineer",
          email: "engineer@entnt.in",
          password: "engine123",
        },
      ],
      ships: [
        {
          id: "s1",
          name: "Ever Given",
          imo: "9811000",
          flag: "Panama",
          status: "Active",
        },
        {
          id: "s2",
          name: "Maersk Alabama",
          imo: "9164263",
          flag: "USA",
          status: "Under Maintenance",
        },
      ],
      components: [
        {
          id: "c1",
          shipId: "s1",
          name: "Main Engine",
          serialNumber: "ME-1234",
          installDate: "2020-01-10",
          lastMaintenanceDate: "2024-03-12",
        },
        {
          id: "c2",
          shipId: "s2",
          name: "Radar",
          serialNumber: "RAD-5678",
          installDate: "2021-07-18",
          lastMaintenanceDate: "2023-12-01",
        },
      ],
      jobs: [
        {
          id: "j1",
          componentId: "c1",
          shipId: "s1",
          type: "Inspection",
          priority: "High",
          status: "Open",
          assignedEngineerId: "3",
          scheduledDate: "2025-05-05",
        },
      ],
      notifications: [],
    };

    Object.keys(initialData).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(initialData[key]));
    });
  }
};

export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addItem = (key, item) => {
  const data = getData(key);
  data.push(item);
  saveData(key, data);
  return data;
};

export const updateItem = (key, id, updates) => {
  const data = getData(key);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    saveData(key, data);
  }
  return data;
};

export const deleteItem = (key, id) => {
  const data = getData(key).filter((item) => item.id !== id);
  saveData(key, data);
  return data;
};
