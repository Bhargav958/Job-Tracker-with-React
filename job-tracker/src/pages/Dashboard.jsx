import { useEffect, useState } from "react";
import { addJob, getJobs, deleteJob } from "../appwrite/auth";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  //create job,title,company,status
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  //for search filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  //for charts
  const COLORS = ["#3b82f6", "#facc15", "#ef4444"];
  const data = [
    { name: "Applied", value: 0 },
    { name: "Interview", value: 0 },
    { name: "Rejected", value: 0 },
  ];

  jobs.forEach((job) => {
    if (job.status === "applied") data[0].value++;
    else if (job.status === "interview") data[1].value++;
    else if (job.status === "rejected") data[2].value++;
  });

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.documents);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = async () => {
    if (!title || !company) return;
    await addJob(title, company, status);
    setTitle("");
    setCompany("");
    setStatus("applied");
    fetchJobs();
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    // ||
    // job.company.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || job.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Add Job */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Job Title"
          className="border p-2 dark:bg-gray-700"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Company Title"
          className="border p-2 dark:bg-gray-700"
          onChange={(e) => setCompany(e.target.value)}
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 dark:bg-gray-700"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={handleAdd} className="bg-blue-500 text-white px-4">
          Add
        </button>
      </div>

      {/* Search Filter UI */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border p-2 dark:bg-gray-700 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 dark:bg-gray-700 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Job List */}
      <div>
        {filteredJobs.map((job) => (
          <div
            key={job.$id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{job.title}</p>
              <p className="text-gray-500">{job.company}</p>

              <span
                className={`text-sm mt-1 inline-block px-2 py-1 rounded ${
                  job.status === "applied"
                    ? "bg-blue-200 text-blue-800"
                    : job.status === "interview"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                }`}
              >
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
        ))}
      </div>

      {/* Adding Chart UI */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Job Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
