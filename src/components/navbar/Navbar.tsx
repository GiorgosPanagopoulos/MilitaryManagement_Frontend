import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faChalkboardTeacher,
    faChartBar,
    faCalendar,
    faUserShield,
    faSignOutAlt,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return (
        <nav className="p-4 bg-gray-800 text-white flex items-center justify-between">
            {/* Λογότυπο */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="MilMan Logo" className="h-10 w-auto" />
                <span className="text-xl font-semibold">MilMan</span>
            </div>

            {/* Πλοήγηση */}
            <ul className="flex space-x-4 items-center">
                <li>
                    <Link to="/" className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                </li>
                {token && (
                    <>
                        <li>
                            <Link to="/personnel" className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faUser} />
                                <span>Προσωπικό</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/training" className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faChalkboardTeacher} />
                                <span>Εκπαίδευση</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/statistics" className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faChartBar} />
                                <span>Στατιστικά</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/calendar" className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faCalendar} />
                                <span>Ημερολόγιο</span>
                            </Link>
                        </li>
                    </>
                )}
                {role === "admin" && (
                    <li>
                        <Link to="/admin" className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faUserShield} />
                            <span>Διαχείριση</span>
                        </Link>
                    </li>
                )}
                <li>
                    {token ? (
                        <Link to="/logout" className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Αποσύνδεση</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Σύνδεση</span>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}