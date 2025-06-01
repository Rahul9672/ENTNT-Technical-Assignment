import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getData,
  addItem,
  updateItem,
  deleteItem,
} from "../utils/localStorageUtils";
import { useNotifications } from "./NotificationContext";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  const refreshJobs = () => {
    const jobsData = getData("jobs") || [];
    setJobs(jobsData);
    setLoading(false);
  };

  useEffect(() => {
    refreshJobs();
  }, []);

  const addJob = (job) => {
    const newJob = { ...job, id: `j${Date.now()}`, status: "Open" };
    addItem("jobs", newJob);
    refreshJobs();
    addNotification(`New job created: ${job.type}`, "info");
    return newJob;
  };

  const updateJob = (id, updates) => {
    updateItem("jobs", id, updates);
    refreshJobs();
    addNotification(`Job updated: ${updates.status || "modified"}`, "info");
  };

  const deleteJob = (id) => {
    deleteItem("jobs", id);
    refreshJobs();
    addNotification("Job deleted", "warning");
  };

  return (
    <JobsContext.Provider
      value={{ jobs, loading, addJob, updateJob, deleteJob }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
};
