// src/components/Dashboard/KPICards.jsx

import { useEffect, useState } from "react";
import { getData } from "../../utils/localStorageUtils";
import { GiBattleship } from "react-icons/gi";
import { FcEngineering } from "react-icons/fc";
import { GrInProgress } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";

const KPICards = () => {
  const [kpis, setKpis] = useState({
    totalShips: 0,
    overdueComponents: 0,
    jobsInProgress: 0,
    completedJobs: 0,
  });

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

    setKpis({
      totalShips: ships.length,
      overdueComponents,
      jobsInProgress: jobs.filter((job) => job.status === "In Progress").length,
      completedJobs: jobs.filter((job) => job.status === "Completed").length,
    });
  }, []);

  const kpiData = [
    {
      title: "Overall Ships",
      value: kpis.totalShips,
      icon: <GiBattleship className="h-14 w-16" />,
      bg: "bg-gradient-to-r from-indigo-500 to-purple-700 opacity-70",
    },
    {
      title: "Overdue Components",
      value: kpis.overdueComponents,
      icon: <FcEngineering className="h-14 w-16" />,
      bg: "bg-gradient-to-r from-red-400 to-red-600 opacity-70",
    },
    {
      title: "Jobs In Progress",
      value: kpis.jobsInProgress,
      icon: <GrInProgress className="h-14 w-16" />,
      bg: "bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-70",
    },
    {
      title: "Completed Jobs",
      value: kpis.completedJobs,
      icon: <FiCheckCircle className="h-14 w-16" />,
      bg: "bg-gradient-to-r from-green-400 to-green-600 opacity-70 ",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={`${kpi.bg} text-white rounded-xl backdrop-blur-md shadow-lg hover:-translate-y-1.5 transition-transform duration-200 min-h-[200px] flex items-center p-8`}
        >
          <div className="flex justify-between w-full items-center">
            <div>
              <p className="opacity-90 tracking-wide translate-y-[-45px] text-md">
                {kpi.title}
              </p>
              <h3 className="text-4xl font-bold translate-x-4">{kpi.value}</h3>
            </div>
            <div className="text-white w-10 h-10">{kpi.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
