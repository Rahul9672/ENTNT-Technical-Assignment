import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { getData } from '../../utils/localStorageUtils';

import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi"; 
import JobForm from "./JobForm";
import HighlightText from "../core/HighlightText";


const JobList = () => {
  const { jobs, loading, deleteJob } = useJobs();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [selectJob, setSelectJob] = useState(null);

  if (loading)
    return <p className="text-center py-8 text-gray-700">Loading jobs...</p>;

    function handleEdit(job){
        console.log(job);
        setSelectJob(job);
        setOpenForm(true);
    }


    const handleAdd = () => {
        setSelectJob(null);
        setOpenForm(true);
    };
  

  return (
    <div className="relative w-full min-h-screen mt-10 ml-24 ">
        
      
      <div className="p-4 w-11/12 z-10 relative px-12">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold">
            <HighlightText text="Maintenance Jobs" />
          </h2>
          <button
            onClick={handleAdd}
            className="flex items-center translate-x-[-95px] gap-2 bg-indigo-900 hover:bg-indigo-800 text-white/70 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            aria-label="Add Job"
          >
            <FiPlus className="w-4 h-4 rounded-lg" />
            Add New Job
          </button>

        </div>

        <JobForm
            key={selectJob?.id || 'new'} 
            open={openForm}
            onClose={() => setOpenForm(false)}
            jobs={selectJob}
        />


       
        <div className="text-black overflow-x-auto w-11/12 bg-white/70 rounded-lg shadow-md border border-richblack-300 ">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-300 text-black text-xl ">
              <tr>
                <th className="py-3 px-6 border-r-2  text-center border-richblack-300  font-semibold">Job Type</th>
                <th className="py-3 px-6  border-r-2 text-center border-richblack-300 font-semibold">Component</th>
                <th className="py-3 px-6 border-r-2  border-richblack-300 font-semibold">Ship</th>
                <th className="py-3 px-6 border-r-2  border-richblack-300 font-semibold">Priority</th>
                <th className="py-3 px-6 border-r-2 border-richblack-300 font-semibold">Status</th>
                <th className="py-3 px-6 border-r-2  border-richblack-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b last:border-b-0  transition-colors gap-4"
                >
                  <td className="py-3 px-6 border-r border-black/20">{job.type}</td>
                  <td className="py-3 px-6 border-r border-black/20">{getData('components').find(c => c.id === job.componentId)?.name || 'N/A'}</td>
                  <td className="py-3 px-6 border-r border-black/20">{getData('ships').find(s => s.id === job.shipId)?.name || 'N/A'}</td>
                  <td className="py-3 px-6 border-r border-black/20">{job.priority}</td>
                  <td className="py-3 px-6 border-r border-black/20">{job.status}</td>
                  <td className="py-3 px-6 flex items-center ml-4 gap-6 border-r border-black/20">
                    <button
                    onClick={() => handleEdit(job)}
                      aria-label="Edit Job"
                      className="text-indigo-900"
                    >
                      <FiEdit className="w-5 h-5 " />
                    </button>
                    {user?.role === "Admin" && (
                      <button
                        onClick={() => deleteJob(job.id)}
                        aria-label="Delete Job"
                        className="text-red-800"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default JobList;
