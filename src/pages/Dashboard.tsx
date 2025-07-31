import { Link } from "react-router-dom";
import {
  FaUser,
  FaChalkboardTeacher,
  FaChartPie,
  FaCalendarAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { Code } from "lucide-react"; // Μπορείς να αλλάξεις σε react-icons αν θες

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
        {/* ✅ Logo και Τίτλος */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-transparent transition-colors">
            <img
                src={logo}
                alt="MilMan Logo"
                className="h-20 sm:h-24 md:h-28 lg:h-32 object-contain transition-opacity duration-500"
            />
          </div>

          <div className="text-center mt-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-stencil font-bold uppercase tracking-wide text-gray-800 dark:text-white">
              ΣΥΣΤΗΜΑ ΕΚΠΑΙΔΕΥΣΗΣ ΣΤΕΛΕΧΩΝ
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-robotoMono tracking-widest text-gray-500 dark:text-gray-400">
              MILITARY MANAGEMENT
            </p>
          </div>
        </div>

        {/* ✅ Νέο Fancy Banner με marquee */}
        <div className="overflow-hidden w-full max-w-full mb-8">
          <div className="inline-flex items-center animate-marquee whitespace-nowrap px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-full shadow-md w-fit mx-auto">
            <Code className="w-5 h-5 text-indigo-300 mr-2 shrink-0" />
            <span className="font-medium">
            Παρακολούθησε εκπαιδεύσεις, πρόσθεσε νέο προσωπικό και δες αναφορές - όλα σε μία εφαρμογή!
          </span>
            <span className="ml-2 text-white">|</span>
          </div>
        </div>

        {/* 🔘 Κουμπιά Dashboard */}
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
