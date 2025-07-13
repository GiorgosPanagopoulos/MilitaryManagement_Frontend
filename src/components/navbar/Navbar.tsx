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
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 shadow">
            <div className="flex items-center justify-between">
                {/* Λογότυπο */}
                <div className="flex items-center space-x-3 min-w-[140px]">
                    <img src={logo} alt="MilMan Logo" className="h-10 w-auto" />
                    <span className="text-xl font-semibold whitespace-nowrap">MilMan</span>
                </div>

                {/* Hamburger Icon */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-5 items-center text-sm">
                    <li>
                        <Link to="/" className="flex items-center space-x-1 hover:underline">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </Link>
                    </li>
                    {token && (
                        <>
                            <li>
                                <Link to="/personnel" className="flex items-center space-x-1 hover:underline">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Προσωπικό</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/training" className="flex items-center space-x-1 hover:underline">
                                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                                    <span>Εκπαίδευση</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistics" className="flex items-center space-x-1 hover:underline">
                                    <FontAwesomeIcon icon={faChartBar} />
                                    <span>Στατιστικά</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/calendar" className="flex items-center space-x-1 hover:underline">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span>Ημερολόγιο</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {role === "admin" && (
                        <li>
                            <Link to="/admin" className="flex items-center space-x-1 hover:underline">
                                <FontAwesomeIcon icon={faUserShield} />
                                <span>Διαχείριση</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        {token ? (
                            <Link to="/logout" className="flex items-center space-x-1 hover:underline">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span>Αποσύνδεση</span>
                            </Link>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-1 hover:underline">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span>Σύνδεση</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="flex flex-col mt-4 space-y-3 md:hidden text-sm">
                    <li>
                        <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </Link>
                    </li>
                    {token && (
                        <>
                            <li>
                                <Link to="/personnel" className="flex items-center space-x-2" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Προσωπικό</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/training" className="flex items-center space-x-2" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                                    <span>Εκπαίδευση</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistics" className="flex items-center space-x-2" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faChartBar} />
                                    <span>Στατιστικά</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/calendar" className="flex items-center space-x-2" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span>Ημερολόγιο</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {role === "admin" && (
                        <li>
                            <Link to="/admin" className="flex items-center space-x-2" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faUserShield} />
                                <span>Διαχείριση</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        {token ? (
                            <Link to="/logout" className="flex items-center space-x-2" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span>Αποσύνδεση</span>
                            </Link>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-2" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span>Σύνδεση</span>
                            </Link>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
}