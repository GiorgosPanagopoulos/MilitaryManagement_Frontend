import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import UserEditModal from "../components/UserEditModal";

interface User {
    _id: string;
    email: string;
    role: string;
}

interface NewUser {
    email: string;
    password: string;
}

export default function AdminPage() {
    const { token, role, isLoading } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<NewUser>({ email: "", password: "" });
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editData, setEditData] = useState({ email: "", password: "" });

    if (isLoading) {
        return <div className="text-center mt-10 text-gray-500 dark:text-gray-300">Φόρτωση...</div>;
    }

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Σφάλμα κατά την ανάκτηση χρηστών:", err);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                email: newUser.email,
                password: newUser.password,
                role: "user",
            };

            await axios.post("/users", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNewUser({ email: "", password: "" });
            await fetchUsers();
            alert("✅ Ο χρήστης δημιουργήθηκε επιτυχώς!");
        } catch (err) {
            console.error("❌ Σφάλμα κατά τη δημιουργία χρήστη:", err);
            alert("❌ Αποτυχία δημιουργίας χρήστη. Δοκιμάστε ξανά.");
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Είστε σίγουρος ότι θέλετε να διαγράψετε αυτόν τον χρήστη;");
        if (!confirmed) return;

        try {
            await axios.delete(`/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchUsers();
            alert("✅ Ο χρήστης διαγράφηκε επιτυχώς!");
        } catch (err) {
            console.error("❌ Σφάλμα κατά τη διαγραφή χρήστη:", err);
            alert("❌ Αποτυχία διαγραφής. Δεν έχετε δικαιώματα ή υπήρξε σφάλμα.");
        }
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setEditData({ email: user.email, password: "" });
    };

    const closeEditModal = () => {
        setEditingUser(null);
        setEditData({ email: "", password: "" });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        try {
            await axios.put(`/users/${editingUser._id}`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchUsers();
            alert("✅ Ο χρήστης ενημερώθηκε");
            closeEditModal();
        } catch (err) {
            console.error("Σφάλμα:", err);
            alert("❌ Αποτυχία ενημέρωσης χρήστη");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Πίνακας Χρηστών</h2>

            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow rounded text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Ρόλος</th>
                    <th className="py-2 px-4 border-b text-left">Ενέργειες</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-2 px-4 border-b dark:border-gray-600 dark:text-gray-100">{u.email}</td>
                        <td className="py-2 px-4 border-b capitalize dark:border-gray-600 dark:text-gray-100">
                            {u.role}
                        </td>
                        <td className="py-2 px-4 border-b dark:border-gray-600">
                            {u.email !== "admin@milman.local" ? (
                                <>
                                    <button
                                        className="text-blue-600 dark:text-blue-400 hover:underline mr-2"
                                        onClick={() => openEditModal(u)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => handleDelete(u._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <span className="text-gray-400 italic">Προστατευμένος</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-8 mb-2 dark:text-white">Προσθήκη Νέου Χρήστη</h3>
            <form
                onSubmit={handleCreateUser}
                className="bg-gray-50 dark:bg-gray-700 p-4 shadow rounded-md space-y-3 max-w-md"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Κωδικός"
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Προσθήκη
                </button>
            </form>

            {editingUser && (
                <UserEditModal
                    editingUser={editingUser}
                    editData={editData}
                    setEditData={setEditData}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
}
