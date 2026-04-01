import { useEffect, useState } from "react";
import { addJob, getJobs, deleteJob } from "../appwrite/auth";
// import Navbar from "./Navbar";
import { client, config } from "../appwrite/config";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Layout from "./Layout";

import { toast } from "react-toastify";

function Dashboard() {
  //create job,title,company,status
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  //for edit
  const [editId, setEditId] = useState(null);

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

  //instead of lists, using columns
  const columns = {
    applied: jobs.filter((j) => j.status === "applied"),
    interview: jobs.filter((j) => j.status === "interview"),
    rejected: jobs.filter((j) => j.status === "rejected"),
  };

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.documents);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = async () => {
    if (!title || !company) return;

    try {
      if (editId) {
        // UPDATE
        await addJob(title, company, status, editId); // we'll modify backend
        toast.success("Job updated ✏️");
        setEditId(null);
      } else {
        // CREATE
        await addJob(title, company, status);
        toast.success("Job added 🚀");
      }

      setTitle("");
      setCompany("");
      setStatus("applied");
      fetchJobs();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted ❌");
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

  const handleEdit = (job) => {
    setTitle(job.title);
    setCompany(job.company);
    setStatus(job.status);
    setEditId(job.$id);
  };

  //for drag and drop functionality, we will implement it in next iteration, as it requires backend changes to update the status of the job when moved across columns
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId;

    // 🔥 1. Update UI instantly
    const updatedJobs = jobs.map((job) =>
      job.$id === jobId ? { ...job, status: newStatus } : job,
    );

    setJobs(updatedJobs);

    // 🔥 2. Update DB in background
    const job = jobs.find((j) => j.$id === jobId);

    try {
      await addJob(job.title, job.company, newStatus, jobId);
    } catch (err) {
      console.error(err);

      // ❌ rollback if error
      fetchJobs();
    }
  };

  //used for realtime subscription, to get real time updates when any change happens in the jobs collection,
  // so that we can update the UI instantly without refreshing the page
  useEffect(() => {
    fetchJobs();
    //   too many api calls so we are removing this and relying on realtime updates to fetch the latest jobs data
    //  Realtime subscription
    const unsubscribe = client.subscribe(
      `databases.${config.databaseId}.collections.${config.collectionId}.documents`,
      (response) => {
        const event = response.events[0];
        const job = response.payload;

        console.log("Realtime:", event);
  
        if (event.includes("create")) {       //CREATE
          toast.info("New job added 📢");
          setJobs((prev) => {
            const exists = prev.find((j) => j.$id === job.$id);
            if (exists) return prev;
            return [...prev, job];
          });
        } else if (event.includes("update")) {     //  UPDATE
          setJobs((prev) => prev.map((j) => (j.$id === job.$id ? job : j)));
        } else if (event.includes("delete")) {        //  DELETE
          setJobs((prev) => prev.filter((j) => j.$id !== job.$id));
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {/* Adding Navbar  */}
      {/* <Navbar /> */}

      {/* <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white"> */}

      <Layout>
        {" "}
        {/* using layout instead of div to include navbar and sidebar in dashboard page */}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Add Job */}
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Job Title"
            className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Company Title"
            className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
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

          <button
            onClick={handleAdd}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
        {/* Search Filter UI */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
        {/* <div>
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

            <button
              onClick={() => handleEdit(job)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div> */}
        {/* for drag and drop  */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-3 gap-4">
            {["applied", "interview", "rejected"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 dark:bg-gray-800 p-4 rounded"
                  >
                    <h2 className="font-bold mb-3 capitalize">{status}</h2>

                    {columns[status].map((job, index) => (
                      <Draggable
                        key={job.$id}
                        draggableId={job.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-700 p-3 mb-2 rounded shadow flex justify-between items-center"
                          >
                            <div className="flex flex-col">
                              <span className="text-100">
                                <b>{job.title}</b>
                              </span>
                              <span className="text-70 ">{job.company}</span>
                            </div>
                            <button
                              onClick={() => handleDelete(job.$id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
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
        {/* </div> */}
      </Layout>
    </>
  );
}

export default Dashboard;
