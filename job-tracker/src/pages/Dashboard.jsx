{/* import { useEffect, useState } from "react";
// import { addJob, getJobs, deleteJob } from "../appwrite/auth";
// // import Navbar from "./Navbar";
// import { client, config } from "../appwrite/config"; 

// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// import Layout from "./Layout";

// import { toast } from "react-toastify";

// import { motion } from "framer-motion";

// function Dashboard() {
//   //create job,title,company,status
//   const [jobs, setJobs] = useState([]);
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [status, setStatus] = useState("applied");

//   //for edit
//   const [editId, setEditId] = useState(null);

//   //for search filter
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");

//   //for charts
//   const COLORS = ["#6366f1", "#a855f7", "#ef4444"];
//   const data = [
//     { name: "Applied", value: 0 },
//     { name: "Interview", value: 0 },
//     { name: "Rejected", value: 0 },
//   ];

//   jobs.forEach((job) => {
//     if (job.status === "applied") data[0].value++;
//     else if (job.status === "interview") data[1].value++;
//     else if (job.status === "rejected") data[2].value++;
//   });

//   //instead of lists, using columns
//   const columns = {
//     applied: jobs.filter((j) => j.status === "applied"),
//     interview: jobs.filter((j) => j.status === "interview"),
//     rejected: jobs.filter((j) => j.status === "rejected"),
//   };

//   const fetchJobs = async () => {
//     const res = await getJobs();
//     setJobs(res.documents);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleAdd = async () => {
//     if (!title || !company) return;

//     try {
//       if (editId) {
//         // UPDATE
//         await addJob(title, company, status, editId); // we'll modify backend
//         toast.success("Job updated ✏️");
//         setEditId(null);
//       } else {
//         // CREATE
//         await addJob(title, company, status);
//         toast.success("Job added 🚀");
//       }

//       setTitle("");
//       setCompany("");
//       setStatus("applied");
//       fetchJobs();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteJob(id);
//       toast.success("Job deleted ❌");
//       fetchJobs();
//     } catch (error) {
//       console.log("Delete error:", error.message);
//     }
//   };

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch = job.title
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     // ||
//     // job.company.toLowerCase().includes(search.toLowerCase());

//     const matchesFilter = filter === "all" || job.status === filter;

//     return matchesSearch && matchesFilter;
//   });

//   const handleEdit = (job) => {
//     setTitle(job.title);
//     setCompany(job.company);
//     setStatus(job.status);
//     setEditId(job.$id);
//   };

//   //for drag and drop functionality, we will implement it in next iteration, as it requires backend changes to update the status of the job when moved across columns
//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const jobId = result.draggableId;
//     const newStatus = result.destination.droppableId;

//     // 🔥 1. Update UI instantly
//     const updatedJobs = jobs.map((job) =>
//       job.$id === jobId ? { ...job, status: newStatus } : job,
//     );

//     setJobs(updatedJobs);

//     // 🔥 2. Update DB in background
//     const job = jobs.find((j) => j.$id === jobId);

//     try {
//       await addJob(job.title, job.company, newStatus, jobId);
//     } catch (err) {
//       console.error(err);

//       // ❌ rollback if error
//       fetchJobs();
//     }
//   };

//   //used for realtime subscription, to get real time updates when any change happens in the jobs collection,
//   // so that we can update the UI instantly without refreshing the page
//   useEffect(() => {
//     fetchJobs();
//     //   too many api calls so we are removing this and relying on realtime updates to fetch the latest jobs data
//     //  Realtime subscription
//     const unsubscribe = client.subscribe(
//       `databases.${config.databaseId}.collections.${config.collectionId}.documents`,
//       (response) => {
//         const event = response.events[0];
//         const job = response.payload;

//         console.log("Realtime:", event);

//         if (event.includes("create")) {
//           //CREATE
//           toast.info("New job added 📢");
//           setJobs((prev) => {
//             const exists = prev.find((j) => j.$id === job.$id);
//             if (exists) return prev;
//             return [...prev, job];
//           });
//         } else if (event.includes("update")) {
//           //  UPDATE
//           setJobs((prev) => prev.map((j) => (j.$id === job.$id ? job : j)));
//         } else if (event.includes("delete")) {
//           //  DELETE
//           setJobs((prev) => prev.filter((j) => j.$id !== job.$id));
//         }
//       },
//     );
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <>
//       {/* Adding Navbar  */}
//       {/* <Navbar /> */}

//       {/* <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white"> */}

//       <Layout>
//         {" "}
//         {/* using layout instead of div to include navbar and sidebar in dashboard page */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//             Dashboard
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             Track and manage your job applications
//           </p>
//         </div>
//         {/* Add Job */}
//         <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 mb-6 shadow-lg">
//           <div className="flex flex-wrap gap-3">
//             <input
//               placeholder="Job Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />

//             <input
//               placeholder="Company"
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//               className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />

//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
//             >
//               <option value="applied">Applied</option>
//               <option value="interview">Interview</option>
//               <option value="rejected">Rejected</option>
//             </select>

//             <button
//               onClick={handleAdd}
//               className="bg-linear-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-xl font-medium shadow-md hover:scale-105 hover:opacity-90 transition"
//             >
//               {editId ? "Update" : "Add"}
//             </button>
//           </div>
//         </div>
//         {/* Search Filter UI */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Search jobs..."
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />

//           <select
//             onChange={(e) => setFilter(e.target.value)}
//             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
//           >
//             <option value="all">All</option>
//             <option value="applied">Applied</option>
//             <option value="interview">Interview</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//         {/* Job List */}
//         {/* <div>
//         {filteredJobs.map((job) => (
//           <div
//             key={job.$id}
//             className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-3 flex justify-between items-center"
//           >
//             <div>
//               <p className="text-lg font-semibold">{job.title}</p>
//               <p className="text-gray-500">{job.company}</p>

//               <span
//                 className={`text-sm mt-1 inline-block px-2 py-1 rounded ${
//                   job.status === "applied"
//                     ? "bg-blue-200 text-blue-800"
//                     : job.status === "interview"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : "bg-red-200 text-red-800"
//                 }`}
//               >
//                 {job.status}
//               </span>
//             </div>

//             <button
//               onClick={() => handleDelete(job.$id)}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>

//             <button
//               onClick={() => handleEdit(job)}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div> */}
//         {/* for drag and drop  */}
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <div className="grid md:grid-cols-3 gap-4">
//             {["applied", "interview", "rejected"].map((status) => (
//               <Droppable droppableId={status} key={status}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 min-h-96"
//                   >
//                     <h2 className="font-bold mb-3 capitalize">{status}</h2>

//                     {columns[status].map((job, index) => (
//                       <Draggable
//                         key={job.$id}
//                         draggableId={job.$id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <motion.div
//                             layout
//                             whileHover={{ y: -4 }}
//                             whileTap={{ scale: 0.97 }}
//                             transition={{ type: "spring", stiffness: 200 }}
//                           >
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="bg-white/10 backdrop-blur-md border border-white/10 p-3 mb-3 rounded-xl flex justify-between items-center hover:scale-[1.02] hover:bg-white/20 transition"
//                             >
//                               <div className="flex flex-col">
//                                 <span className="font-semibold text-white">
//                                   {job.title}
//                                 </span>
//                                 <span className="text-sm text-gray-400">
//                                   {job.company}
//                                 </span>
//                               </div>
//                               <button
//                                 onClick={() => handleDelete(job.$id)}
//                                 className="text-red-400 hover:text-red-300 hover:scale-110 transition"
//                               >
//                                 ✕
//                               </button>
//                             </div>
//                           </motion.div>
//                         )}
//                       </Draggable>
//                     ))}

//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//         {/* Adding Chart UI */}
//         <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
//           <h2 className="text-xl font-semibold mb-4 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//             Job Analytics
//           </h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={data} dataKey="value" outerRadius={100} label>
//                 {data.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         {/* </div> */}
//       </Layout>
//     </>
//   );
// }

// export default Dashboard; */}


import { useEffect, useState } from "react";
import { addJob, getJobs, deleteJob } from "../appwrite/auth";
// import Navbar from "./Navbar";
import { client, config } from "../appwrite/config";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Layout from "./Layout";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { runAiInsight } from "../appwrite/ai";

const STATUS_COLUMNS = ["applied", "interview", "rejected"];

function buildColumns(jobs) {
  return {
    applied: jobs.filter((job) => job.status === "applied"),
    interview: jobs.filter((job) => job.status === "interview"),
    rejected: jobs.filter((job) => job.status === "rejected"),
  };
}

function reorderJobs(jobs, source, destination) {
  const columns = buildColumns(jobs);
  const sourceJobs = [...columns[source.droppableId]];
  const isSameColumn = source.droppableId === destination.droppableId;
  const destinationJobs = isSameColumn
    ? sourceJobs
    : [...columns[destination.droppableId]];

  const [movedJob] = sourceJobs.splice(source.index, 1);

  if (!movedJob) {
    return jobs;
  }

  const updatedJob = isSameColumn
    ? movedJob
    : { ...movedJob, status: destination.droppableId };

  destinationJobs.splice(destination.index, 0, updatedJob);

  if (isSameColumn) {
    return [
      ...destinationJobs,
      ...STATUS_COLUMNS.flatMap((status) =>
        status === source.droppableId ? [] : columns[status]
      ),
    ];
  }

  return [
    ...destinationJobs,
    ...sourceJobs,
    ...STATUS_COLUMNS.flatMap((status) => {
      if (
        status === source.droppableId ||
        status === destination.droppableId
      ) {
        return [];
      }

      return columns[status];
    }),
  ];
}

function Dashboard() {
  // create job,title,company,status
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");

  // for edit
  const [editId, setEditId] = useState(null);

  // for search filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // for charts
  const COLORS = ["#6366f1", "#a855f7", "#ef4444"];

  // AI assistant
  const [aiJobText, setAiJobText] = useState("");
  const [aiMode, setAiMode] = useState("job_insights");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleRunAi = async () => {
    if (!aiJobText.trim()) {
      toast.info("Paste a job description first");
      return;
    }

    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await runAiInsight({ jobText: aiJobText, mode: aiMode });
      setAiResult(res);
    } catch (err) {
      toast.error(err?.message || "AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  const data = [
    { name: "Applied", value: 0 },
    { name: "Interview", value: 0 },
    { name: "Rejected", value: 0 },
  ];

  // calculate chart data dynamically
  jobs.forEach((job) => {
    if (job.status === "applied") data[0].value++;
    else if (job.status === "interview") data[1].value++;
    else if (job.status === "rejected") data[2].value++;
  });

  // instead of lists, using columns (kanban)
  const columns = buildColumns(jobs);

  // fetch jobs from backend
  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.documents);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // handle add / update
  const handleAdd = async () => {
    if (!title || !company) return;

    try {
      if (editId) {
        // UPDATE
        await addJob(title, company, status, editId);
        toast.success("Job updated ✏️");
        setEditId(null);
      } else {
        // CREATE
        await addJob(title, company, status);
        toast.success("Job added 🚀");
      }

      // reset form
      setTitle("");
      setCompany("");
      setStatus("applied");

      fetchJobs();
    } catch (err) {
      console.error(err.message);
    }
  };

  // delete job
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted ❌");
      fetchJobs();
    } catch (error) {
      console.log(error.message);
    }
  };

  // drag and drop functionality
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return;
    }

    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId;
    const previousJobs = jobs;

    // Update UI instantly with cross-column moves and same-column reordering.
    const updatedJobs = reorderJobs(jobs, result.source, result.destination);

    setJobs(updatedJobs);

    const job = jobs.find((j) => j.$id === jobId);

    try {
      if (job && job.status !== newStatus) {
        await addJob(job.title, job.company, newStatus, jobId);
      }
    } catch (err) {
      console.error(err);
      setJobs(previousJobs);
      toast.error("Could not move the job card");
    }
  };

  // realtime subscription (Appwrite)
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${config.databaseId}.collections.${config.collectionId}.documents`,
      (response) => {
        const event = response.events[0];
        const job = response.payload;

        if (event.includes("create")) {
          // CREATE
          setJobs((prev) => {
            const exists = prev.find((j) => j.$id === job.$id);
            if (exists) return prev;
            return [...prev, job];
          });
        } else if (event.includes("update")) {
          // UPDATE
          setJobs((prev) =>
            prev.map((j) => (j.$id === job.$id ? job : j))
          );
        } else if (event.includes("delete")) {
          // DELETE
          setJobs((prev) => prev.filter((j) => j.$id !== job.$id));
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <motion.div
        // IMPORTANT: avoid translate transforms on DnD parents
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="mb-2 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-400 text-sm mt-2 max-w-xl">
                Track and manage your job applications in one place
              </p>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
            >
              View profile
            </Link>
          </div>
        </div>

        {/* AI Assistant (Gemini via Appwrite Function) */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 ring-1 ring-white/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                AI Assistant
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Paste a job description to get insights or interview prep.
              </p>
              {!import.meta.env.VITE_APPWRITE_AI_FUNCTION_ID && (
                <p className="text-amber-300/90 text-sm mt-2">
                  Setup needed: create `job-tracker/.env` and set{" "}
                  <span className="font-semibold">
                    VITE_APPWRITE_AI_FUNCTION_ID
                  </span>
                  , then restart `npm run dev`.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <select
                value={aiMode}
                onChange={(e) => setAiMode(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40"
              >
                <option value="job_insights">Job insights</option>
                <option value="interview_prep">Interview prep</option>
              </select>
              <button
                type="button"
                onClick={handleRunAi}
                disabled={aiLoading}
                className="shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 rounded-xl font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition shadow-md shadow-indigo-500/20"
              >
                {aiLoading ? "Thinking..." : "Generate"}
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <textarea
              value={aiJobText}
              onChange={(e) => setAiJobText(e.target.value)}
              rows={8}
              placeholder="Paste the job description here..."
              className="w-full resize-y bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40"
            />

            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 overflow-auto">
              {!aiResult ? (
                <p className="text-gray-400 text-sm">
                  Your results will appear here.
                </p>
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-gray-200">
                  {aiResult.text ||
                    aiResult.result ||
                    JSON.stringify(aiResult, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Add Job Section (Glass UI) */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 ring-1 ring-white/5">
          <p className="text-gray-400 text-sm mb-4 font-medium">
            Add or update an application
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 min-w-[200px] bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40"
            />

            <input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex-1 min-w-[200px] bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white lg:w-44 lg:shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              type="button"
              onClick={handleAdd}
              className="shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition shadow-md shadow-indigo-500/20"
            >
              {editId ? "Update" : "Add job"}
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {STATUS_COLUMNS.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white/5 backdrop-blur-lg border rounded-2xl p-3 sm:p-4 min-h-[280px] sm:min-h-[360px] md:min-h-[400px] shadow-lg shadow-black/15 ring-1 ring-white/5 transition-colors ${
                      snapshot.isDraggingOver
                        ? "border-indigo-400/50 bg-indigo-500/10"
                        : "border-white/10"
                    }`}
                  >
                    {/* Column Header with count */}
                    <h2 className="flex justify-between items-center text-gray-200 font-semibold mb-4 capitalize border-b border-white/10 pb-3">
                      {status}
                      <span className="text-xs bg-white/10 px-2 py-1 rounded-full font-medium">
                        {columns[status].length}
                      </span>
                    </h2>

                    {/* Empty state */}
                    {columns[status].length === 0 && (
                      <p className="text-gray-500 text-sm text-center">
                        No jobs here
                      </p>
                    )}

                    {/* Job cards */}
                    {columns[status].map((job, index) => (
                      <Draggable
                        key={job.$id}
                        draggableId={job.$id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={provided.draggableProps.style}
                            className={`bg-white/10 border p-3 mb-3 rounded-xl flex justify-between items-center shadow-sm transition-colors ${
                              snapshot.isDragging
                                ? "border-indigo-400/60 shadow-lg shadow-indigo-500/10"
                                : "border-white/10 hover:border-white/20 hover:-translate-y-1"
                            }`}
                          >
                            <div>
                              <p className="font-semibold">{job.title}</p>
                              <p className="text-sm text-gray-400">
                                {job.company}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                {...provided.dragHandleProps}
                                className="cursor-grab select-none text-gray-400 active:cursor-grabbing"
                                aria-label={`Drag ${job.title}`}
                                title="Drag job card"
                              >
                                ⋮⋮
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDelete(job.$id)}
                                className="text-red-400 hover:text-red-300 transition"
                              >
                                ✕
                              </button>
                            </div>
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

        {/* Analytics Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:p-8 shadow-lg shadow-black/20 ring-1 ring-white/5">
          <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Job Analytics
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Status breakdown across your pipeline
          </p>

          <div className="w-full max-w-md mx-auto h-[220px] sm:h-[280px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" outerRadius="75%" label>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Dashboard;
