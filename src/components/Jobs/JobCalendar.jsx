import { useState } from 'react';
import { getData } from '../../utils/localStorageUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './custom-datepicker.css';




const JobCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const jobs = getData('jobs') || [];
  const ships = getData('ships') || [];
  const components = getData('components') || [];
  const users = getData('users') || [];

  const jobsOnSelectedDate = jobs.filter((job) => {
    const jobDate = new Date(job.scheduledDate);
    return (
      !isNaN(jobDate) &&
      format(jobDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
  });

  const getShipName = (shipId) =>
    ships.find((ship) => ship.id === shipId)?.name || 'Unknown Ship';

  const getComponentName = (componentId) =>
    components.find((comp) => comp.id === componentId)?.name || 'Unknown Component';

  const getEngineerName = (engineerId) =>
    users.find((user) => user.id === engineerId)?.email || 'Unassigned';
    

  return (
    <div className="flex flex-col px-8  md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-start mt-10 ml-24">
      {/* Calendar Section */}
      <div
        className="bg-indigo-100 bg-opacity-70 p-6 rounded-3xl shadow-md min-w-full md:min-w-[320px]"
        style={{ opacity: 0.7, }}
      >
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          calendarClassName="rounded-4xl shadow-md"
          dayClassName={() => 'text-indigo-900 font-semibold'}
          popperPlacement="bottom"
        />
      </div>

      {/* Job List Section */}
      <div
        className="bg-indigo-100 bg-opacity-70 p-6 rounded-3xl shadow-md flex-1 w-full"
        style={{ opacity: 0.7, }}
      >
        <h2 className="text-indigo-900 font-bold text-xl mb-4 select-none">
          JOBS ON -  {format(selectedDate, 'MMMM d, yyyy')}
        </h2>

        {jobsOnSelectedDate.length === 0 ? (
          <p className="text-gray-800 translate-x-3">No jobs scheduled for this day.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {jobsOnSelectedDate.map((job) => (
              <li key={job.id} className="py-3">
                <div>
                  <p className="text-indigo-900 font-medium text-lg">
                    {job.type} — {getComponentName(job.componentId)}
                  </p>
                  <p className="text-gray-600 text-sm">Ship: {getShipName(job.shipId)}</p>
                  <p className="text-gray-600 text-sm">Priority: {job.priority}</p>
                  <p className="text-gray-600 text-sm">
                    Assigned to: {getEngineerName(job.assignedEngineerId)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobCalendar;
