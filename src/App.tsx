import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import PersonnelPage from "./pages/PersonnelPage";
import TrainingPage from "./pages/TrainingPage";
import StatisticsPage from "./pages/StatisticsPage";
import TrainingCalendarPage from "./pages/TrainingCalendarPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PrivateRoute from "./PrivateRoute";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <Navbar />
                    <main className="flex-grow px-4 sm:px-6 md:px-8">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route
                                path="/personnel"
                                element={
                                    <PrivateRoute>
                                        <PersonnelPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/training"
                                element={
                                    <PrivateRoute>
                                        <TrainingPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/statistics"
                                element={
                                    <PrivateRoute>
                                        <StatisticsPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/calendar"
                                element={
                                    <PrivateRoute>
                                        <TrainingCalendarPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute>
                                        <AdminPage />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            </Router>
        </AuthProvider>
    );
}

export default App;
