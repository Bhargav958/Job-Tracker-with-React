import { Link } from "react-router-dom";
import Layout from "./Layout";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">
          Track Your Jobs Smarter 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          Organize applications, track progress, and land your dream job faster.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </Layout>
  );
}

export default Home;