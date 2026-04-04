// import { Link } from "react-router-dom";
// import Layout from "./Layout";

// function Home() {
//   return (
//     <Layout>
//       <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
//         <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//           Track Your Jobs Smarter
//         </h1>

//         <p className="text-gray-400 mb-8 max-w-lg text-lg">
//           Organize applications, track progress, and land your dream job faster
//           with a modern dashboard.
//         </p>

//         <div className="flex gap-4">
//           <Link
//             to="/login"
//             className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl hover:scale-105 transition"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;

import { Link } from "react-router-dom";
import Layout from "./Layout";
import { motion } from "framer-motion";

function Home() {
  return (
    <Layout>
      {/* Page animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-1"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl text-center max-w-2xl w-full">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Track Your Jobs Smarter
          </h1>

          <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg px-1">
            Organize applications, track progress, and land your dream job faster
            with a modern dashboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto">
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
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Home;