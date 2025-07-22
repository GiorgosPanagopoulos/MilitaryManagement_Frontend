import React, { useEffect, useState } from "react";
import axios from "../axios";

interface User {
    _id: string;
    email: string;
    role: string;
}

interface NewUser {
    email: string;
    password: string;
    role: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<NewUser>({
        email: "",
        password: "",
        role: "user",
    });

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Σφάλμα κατά την ανάκτηση χρηστών:", err);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...newUser,
                role: newUser.role.toLowerCase(), // Πεζά για συμβατότητα με enum
            };

            await axios.post("/users", payload);
            setNewUser({ email: "", password: "", role: "user" });
            await fetchUsers();
            alert("✅ Ο χρήστης δημιουργήθηκε επιτυχώς!");
        } catch (err) {
            console.error("Σφάλμα κατά τη δημιουργία χρήστη:", err);
            alert("❌ Αποτυχία δημιουργίας χρήστη. Δοκιμάστε ξανά.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Πίνακας Χρηστών</h2>

            <table className="min-w-full bg-white border border-gray-300 shadow rounded text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Ρόλος</th>
                    <th className="py-2 px-4 border-b text-left">Ενέργειες</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{u.email}</td>
                        <td className="py-2 px-4 border-b capitalize">{u.role}</td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-blue-600 hover:underline mr-2">Edit</button>
                            <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-8 mb-2">Προσθήκη Νέου Χρήστη</h3>
            <form
                onSubmit={handleCreateUser}
                className="bg-gray-50 p-4 shadow rounded-md space-y-3 max-w-md"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Κωδικός"
                    className="w-full p-2 border rounded"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    required
                />
                <select
                    className="w-full p-2 border rounded"
                    value={newUser.role}
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, role: e.target.value }))
                    }
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Προσθήκη
                </button>
            </form>
        </div>
    );
}
