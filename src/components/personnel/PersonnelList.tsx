import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Personnel } from "../../types/Personnel";

type Props = {
    data: Personnel[];
    onEdit: (person: Personnel) => void;
    onDelete: (id: string) => void;
};

const PersonnelList = ({ data, onEdit, onDelete }: Props) => {
    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Προσωπικό
            </h2>
            <table className="min-w-full border border-gray-300 shadow-md rounded text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                <tr>
                    <th className="py-2 px-3 border-b text-left">Ονοματεπώνυμο</th>
                    <th className="py-2 px-3 border-b text-left">Βαθμός</th>
                    <th className="py-2 px-3 border-b text-left">Μονάδα</th>
                    <th className="py-2 px-3 border-b text-center">Ενέργειες</th>
                </tr>
                </thead>
                <tbody>
                {data.map((p) => (
                    <tr
                        key={p._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                    >
                        <td className="py-2 px-3 border-b">{p.firstName} {p.lastName}</td>
                        <td className="py-2 px-3 border-b">{p.rank}</td>
                        <td className="py-2 px-3 border-b">{p.unit}</td>
                        <td className="py-2 px-3 border-b text-center">
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => onEdit(p)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                                    title="Επεξεργασία"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(p._id!)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                                    title="Διαγραφή"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td
                            colSpan={4}
                            className="py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                            Δεν υπάρχει καταχωρημένο προσωπικό.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PersonnelList;
