import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Layout from "./Layout";
import { account } from "../appwrite/config";
import { getJobs } from "../appwrite/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [currentUser, jobsResponse] = await Promise.all([
          account.get(),
          getJobs(),
        ]);

        setUser(currentUser);
        setName(currentUser.name || "");
        setJobs(jobsResponse.documents || []);
      } catch (error) {
        console.log(error);
        toast.error("Unable to load profile details");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter your name");
      return;
    }

    setSaving(true);

    try {
      await account.updateName(trimmedName);
      setUser((prev) => ({ ...prev, name: trimmedName }));
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
  };

  const recentJobs = [...jobs]
    .sort(
      (firstJob, secondJob) =>
        new Date(secondJob.$createdAt) - new Date(firstJob.$createdAt)
    )
    .slice(0, 4);

  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "Job Tracker User";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
          Loading profile...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="border-b border-white/10 pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Profile
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                Review your account details and track how your job search is
                moving.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5 sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
                  {initials || "JT"}
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">
                    {displayName}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{user?.email}</p>
                  <p className="mt-2 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Account active
                  </p>
                </div>
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Joined
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {new Date(user?.$createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    User ID
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-white">
                    {user?.$id}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Applications
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {stats.total} tracked
                  </p>
                </div>
              </div>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSave}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Display name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:border-indigo-400/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-gray-400 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </section>

          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5">
                <p className="text-sm text-gray-400">Applied</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {stats.applied}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5">
                <p className="text-sm text-gray-400">Interviews</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {stats.interview}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5">
                <p className="text-sm text-gray-400">Rejected</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {stats.rejected}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5">
                <p className="text-sm text-gray-400">Conversion rate</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {stats.total
                    ? `${Math.round((stats.interview / stats.total) * 100)}%`
                    : "0%"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-lg ring-1 ring-white/5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Recent applications
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Your latest updates from the dashboard
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="text-sm text-indigo-300 transition hover:text-indigo-200"
                >
                  Manage
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {recentJobs.length > 0 ? (
                  recentJobs.map((job) => (
                    <div
                      key={job.$id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {job.title}
                        </p>
                        <p className="truncate text-sm text-gray-400">
                          {job.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium capitalize text-gray-200">
                        {job.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-6 text-center">
                    <p className="text-sm text-gray-400">
                      No applications yet. Start adding jobs from your
                      dashboard.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Profile;
