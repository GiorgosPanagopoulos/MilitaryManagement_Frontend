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
    faUserCircle,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useAuth from "../../context/AuthContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { token, role, email } = useAuth();
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleDarkMode = () => setDarkMode((prev) => {
        const newMode = !prev;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", newMode);
        return newMode;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const displayUser = email ?? "";

    return (
        <nav className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 shadow relative">
            <div className="flex items-center justify-between">
                {/* Λογότυπο */}
                <div className="flex items-center space-x-3 min-w-[140px]">
                    <img src={logo} alt="MilMan Logo" className="h-12 w-auto" />
                    <span className="text-xl font-semibold whitespace-nowrap">MilMan</span>
                </div>

                {/* Δεξιά - Εμφάνιση χρήστη & Burger */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="text-white hover:text-yellow-300 text-lg"
                        aria-label="Toggle Dark Mode"
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </button>

                    {token && displayUser && (
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-200">
                            <FontAwesomeIcon icon={faUserCircle} />
                            <span className="truncate max-w-[160px]">{displayUser}</span>
                        </div>
                    )}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>

            {/* Mobile: Εμφάνιση χρήστη */}
            {token && displayUser && (
                <div className="md:hidden flex justify-end mt-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span className="truncate max-w-[180px]">{displayUser}</span>
                    </div>
                </div>
            )}

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-5 items-center text-sm mt-3 justify-end">
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
