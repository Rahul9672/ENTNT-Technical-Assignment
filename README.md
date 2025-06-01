# 🚢 Ship Maintenance Dashboard

A simple React dashboard to manage ships, components, maintenance jobs, and view KPIs. All data is stored in the browser using `localStorage`.

---

## 📦 Setup Instructions

1. Clone the repository:

2. Install dependencies:
   npm install

3. Start the project:
   npm run dev


4. Open in browser:
   ```
   http://localhost:5174/
   ```

---

## 🧾 Login Users (Predefined)

| Role       | Email              | Password     |
|------------|--------------------|--------------|
| Admin      | admin@entnt.in     | admin123     |
| Inspector  | inspector@entnt.in | inspect123   |
| Engineer   | engineer@entnt.in  | engineer123  |

---

## 📁 Main Features

- **Login System** with role-based access (Admin, Engineer, Inspector)
- **Ship Management** (Add, Edit, Delete ships)
- **Component Management** (by Ship)
- **Maintenance Jobs** (assign priority, engineer, etc.)
- **Notification System** (with read and delete)
- **KPI Dashboard** (with charts and live data)
- **All data saved in localStorage**

---

## 💾 Local Data (Preloaded)

When you run the app, the following default data is added:

```js
{
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
  ],
  components: [
    { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2024-03-12" },
    { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2023-12-01" }
  ],
  jobs: [
    { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-05" }
  ],
  notifications: []
}
```

---

## 🛠 Technologies Used

- React + Vite
- Tailwind CSS (for design)
- Recharts (for charts)
- Context API (for global state)
- localStorage (as mock database)

---# ENTNT-Technical-Assignment
