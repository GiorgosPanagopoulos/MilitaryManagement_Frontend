import React from "react";

interface Props {
    editingUser: { _id: string; email: string; role: string } | null;
    editData: { email: string; password: string };
    setEditData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function UserEditModal({
                                          editingUser,
                                          editData,
                                          setEditData,
                                          onClose,
                                          onSubmit,
                                      }: Props) {
    if (!editingUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-4">Επεξεργασία Χρήστη</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                            setEditData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={editData.password}
                        onChange={(e) =>
                            setEditData((prev) => ({ ...prev, password: e.target.value }))
                        }
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Νέος Κωδικός (προαιρετικό)"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded"
                        >
                            Ακύρωση
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Αποθήκευση
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
