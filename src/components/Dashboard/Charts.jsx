import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";
import { getData } from "../../utils/localStorageUtils";

const COLORS = [
  "#6366f1", // Indigo color for (Overall Ships)
  "#ef4444", // Red color for (Overdue Components)
  "#facc15", // Yellow color for (Jobs In Progress)
  "#22c55e", // Green color for (Completed Jobs)
];

const Charts = () => {
  const [kpiStats, setKpiStats] = useState({
    totalShips: 0,
    overdueComponents: 0,
    jobsInProgress: 0,
    completedJobs: 0,
  });

  const [monthlyJobData, setMonthlyJobData] = useState([]);

  useEffect(() => {
    const ships = getData("ships") || [];
    const components = getData("components") || [];
    const jobs = getData("jobs") || [];

    const today = new Date();

    const overdueComponents = components.filter((comp) => {
      const lastMaintenance = new Date(comp.lastMaintenanceDate);
      const monthsDiff =
        (today.getFullYear() - lastMaintenance.getFullYear()) * 12 +
        (today.getMonth() - lastMaintenance.getMonth());
      return monthsDiff > 6;
    }).length;

    const jobsInProgress = jobs.filter(
      (job) => job.status === "In Progress"
    ).length;
    const completedJobs = jobs.filter(
      (job) => job.status === "Completed"
    ).length;

    setKpiStats({
      totalShips: ships.length,
      overdueComponents,
      jobsInProgress,
      completedJobs,
    });

    // Group completed jobs by month
    const jobCountPerMonth = {};
    jobs.forEach((job) => {
      if (job.status === "Completed" && job.scheduledDate) {
        const month = new Date(job.scheduledDate).toLocaleString("default", {
          month: "short",
        });
        jobCountPerMonth[month] = (jobCountPerMonth[month] || 0) + 1;
      }
    });

    const monthlyDataArray = Object.entries(jobCountPerMonth).map(
      ([month, count]) => ({
        month,
        completed: count,
      })
    );

    setMonthlyJobData(monthlyDataArray);
  }, []);

  const dynamicCategoryData = [
    { name: "Overall Ships", value: kpiStats.totalShips },
    { name: "Overdue Components", value: kpiStats.overdueComponents },
    { name: "Jobs In Progress", value: kpiStats.jobsInProgress },
    { name: "Completed Jobs", value: kpiStats.completedJobs },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full">
      {/* Line Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-glass text-white">
        <h2 className="text-xl font-semibold mb-2 text-cyan-300">
          Maintenance Tasks Completed
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyJobData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="month" stroke="#e5e7eb" />
            <YAxis stroke="#e5e7eb" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#38bdf8"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-glass text-white mr-[-6] ">
        <h2 className="text-xl font-semibold mb-2 text-cyan-300 translate-x-3">
          KPI Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dynamicCategoryData}
              cx="55%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dynamicCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              iconType="circle"
              align="center"
              wrapperStyle={{
                color: "#e5e7eb",
                fontSize: "14px",
                opacity: 0.7,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
