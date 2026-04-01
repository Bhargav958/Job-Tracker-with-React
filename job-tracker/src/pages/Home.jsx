import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
import Layout from "./Layout";

function Home() {
  return (
    <Layout>
      {/* <Navbar /> */}
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Job Tracker</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Track your job applications and stay organized.
        </p>

        <div className="flex gap-4">
          <Link to="/login" className="mb-6 text-gray-600 dark:text-gray-300">
            Login
          </Link>
          <Link
            to="/register"
            className="mb-6 text-gray-600 dark:text-gray-300"
          >
            Register
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default Home;
