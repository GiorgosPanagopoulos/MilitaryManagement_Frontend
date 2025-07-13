import { Link } from "react-router-dom";
import {
  FaUser,
  FaChalkboardTeacher,
  FaChartPie,
  FaCalendarAlt,
} from "react-icons/fa";

export default function DashboardPage() {
  const cards = [
    {
      to: "/personnel",
      icon: <FaUser className="text-3xl" />,
      title: "Προσωπικό",
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      to: "/training",
      icon: <FaChalkboardTeacher className="text-3xl" />,
      title: "Εκπαίδευση",
      bg: "bg-green-600 hover:bg-green-700",
    },
    {
      to: "/statistics",
      icon: <FaChartPie className="text-3xl" />,
      title: "Στατιστικά",
      bg: "bg-purple-600 hover:bg-purple-700",
    },
    {
      to: "/calendar",
      icon: <FaCalendarAlt className="text-3xl" />,
      title: "Ημερολόγιο",
      bg: "bg-yellow-600 hover:bg-yellow-700 text-gray-900",
    },
  ];

  return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          Καλώς ήρθατε στο Military Management
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
              <Link
                  key={index}
                  to={card.to}
                  className={`flex flex-col items-center justify-center space-y-3 p-6 ${card.bg} text-white rounded-2xl shadow-lg transition-all transform hover:scale-105`}
                  title={`Μετάβαση στη σελίδα ${card.title}`}
              >
                {card.icon}
                <span className="text-lg font-semibold">{card.title}</span>
              </Link>
          ))}
        </div>
      </div>
  );
}
