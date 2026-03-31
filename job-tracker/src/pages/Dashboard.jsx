import { useEffect, useState } from "react";
import { addJob, getJobs, deleteJob } from "../appwrite/auth";

function Dashboard() {
  //create job,title,company,status
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.documents);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = async () => {
    await addJob(title, company, status);
    fetchJobs();
  };

  const handleDelete = async () => {
    await deleteJob(id);
    fetchJobs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Add Job */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Job Title"
          className="border p-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Company Title"
          className="border p-2"
          onChange={(e) => setCompany(e.target.value)}
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={handleAdd} className="bg-blue-500 text-white px-4">
          Add
        </button>
      </div>

      {/* Job List */}
      <div
        key={job.$id}
        className="bg-white shadow-md rounded-xl p-4 mb-3 flex justify-between items-center"
      >
        <div>
          <p className="text-lg font-semibold">{job.title}</p>
          <p className="text-gray-500">{job.company}</p>
          <span className="text-sm mt-1 inline-block px-2 py-1 rounded bg-gray-200">
            {job.status}
          </span>
        </div>

        <button
          onClick={() => handleDelete(job.$id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
