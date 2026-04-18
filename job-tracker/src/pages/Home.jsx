import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { account } from "../appwrite/config";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const features = [
    {
      title: "Save every application",
      description:
        "Keep role titles, company names, and application status in one organized workspace.",
    },
    {
      title: "Track your progress",
      description:
        "Move jobs through statuses like Applied, Interview, Offer, or Rejected as your search changes.",
    },
    {
      title: "Review your profile",
      description:
        "See your account details and job-search activity from your profile page.",
    },
  ];

  return (
    <Layout>
      {/* Page animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-1 py-6"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl text-center max-w-4xl w-full">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Track Your Jobs Smarter
          </h1>

          <p className="text-gray-300 mb-4 text-base sm:text-lg px-1 max-w-2xl mx-auto">
            Job Tracker helps you manage your job search from one place. Add
            the companies you apply to, update each application status, and keep
            your dashboard clear while you move toward the next opportunity.
          </p>

          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base px-1 max-w-2xl mx-auto">
            Use it to stay consistent, avoid losing application details, and
            quickly understand which jobs need your attention next.
          </p>

          <div className="grid gap-4 mb-6 sm:mb-8 text-left sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <h2 className="mb-2 text-base font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="touch-manipulation inline-flex justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  Go to Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="touch-manipulation inline-flex justify-center border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 active:bg-white/5 transition"
                >
                  View Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="touch-manipulation inline-flex justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="touch-manipulation inline-flex justify-center border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 active:bg-white/5 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Home;
