import { Link } from "react-router-dom";
import { FaUser, FaChalkboardTeacher, FaChartPie, FaCalendarAlt } from "react-icons/fa";

export default function DashboardPage() {
  return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Καλώς ήρθατε στο Military Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
              to="/personnel"
              className="flex items-center space-x-3 p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaUser className="text-xl" />
            <span>Προσωπικό</span>
          </Link>

          <Link
              to="/training"
              className="flex items-center space-x-3 p-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <FaChalkboardTeacher className="text-xl" />
            <span>Εκπαίδευση</span>
          </Link>

          <Link
              to="/statistics"
              className="flex items-center space-x-3 p-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            <FaChartPie className="text-xl" />
            <span>Στατιστικά</span>
          </Link>

          <Link
              to="/calendar"
              className="flex items-center space-x-3 p-6 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
          >
            <FaCalendarAlt className="text-xl" />
            <span>Ημερολόγιο</span>
          </Link>
        </div>
      </div>
  );
}
