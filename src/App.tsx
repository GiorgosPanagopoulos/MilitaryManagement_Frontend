import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonnelPage from "./pages/PersonnelPage";
import TrainingPage from "./pages/TrainingPage";
import StatisticsPage from "./pages/StatisticsPage";
import TrainingCalendarPage from "./pages/TrainingCalendarPage";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage"; // ✅ Προσθήκη AdminPage

function App() {
    return (
        <Router>
            <Navbar />

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

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Router>
    );
}

export default App;