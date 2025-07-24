import React, { useState, useMemo } from "react";
import { Training } from "../../types/Training";

type Props = {
    trainings?: Training[];
    personnelMap: Record<string, string>;
    onEdit: (training: Training) => void;
    onDelete: (id: string) => void;
};

const TrainingList = ({
                          trainings = [],
                          personnelMap,
                          onEdit,
                          onDelete,
                      }: Props) => {
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDetails = (id: string) => {
        setExpandedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    const filteredTrainings = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return trainings.filter((t) => {
            const descMatch = t.description?.toLowerCase().includes(lower);
            const locMatch = t.location?.toLowerCase().includes(lower);
            const personMatch = (t.personnel || [])
                .map((p: any) => {
                    if (typeof p === "object" && p.firstName && p.lastName) {
                        return `${p.firstName} ${p.lastName}`;
                    }
                    if (typeof p === "string") {
                        return personnelMap[p] || "";
                    }
                    return "";
                })
                .some((name) => name.toLowerCase().includes(lower));

            return descMatch || locMatch || personMatch;
        });
    }, [trainings, searchTerm, personnelMap]);

    return (
        <div className="p-4 sm:p-6 md:p-8 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Εκπαιδεύσεις</h2>

            <input
                type="text"
                placeholder="Αναζήτηση με λέξη-κλειδί..."
                className="mb-4 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded w-full max-w-md text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600 text-sm sm:text-base">
                    <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th className="px-3 py-2 text-left">Περιγραφή</th>
                        <th className="px-3 py-2 text-left">Τοποθεσία</th>
                        <th className="px-3 py-2 text-left">Διάρκεια</th>
                        <th className="px-3 py-2 text-left">Ενέργειες</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 dark:text-white">
                    {filteredTrainings.map((t) => (
                        <React.Fragment key={t.id}>
                            <tr className="border-t dark:border-gray-700">
                                <td className="px-3 py-2 font-medium">{t.description}</td>
                                <td className="px-3 py-2">{t.location}</td>
                                <td className="px-3 py-2">{t.from} έως {t.to}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <button
                                        onClick={() => toggleDetails(t.id)}
                                        className="mr-2 text-green-600 dark:text-green-400 hover:underline"
                                    >
                                        {expandedRows.includes(t.id) ? "Απόκρυψη" : "Λεπτομέρειες"}
                                    </button>
                                    <button
                                        onClick={() => onEdit(t)}
                                        className="mr-2 text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Επεξεργασία
                                    </button>
                                    <button
                                        onClick={() => onDelete(t.id)}
                                        className="text-red-600 dark:text-red-400 hover:underline"
                                    >
                                        Διαγραφή
                                    </button>
                                </td>
                            </tr>

                            {expandedRows.includes(t.id) && (
                                <tr className="border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                                    <td colSpan={4} className="px-4 py-3">
                                        <p className="font-semibold mb-1 text-sm sm:text-base">Προσωπικό:</p>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {(t.personnel || []).map((p: any, idx: number) => {
                                                if (typeof p === "object" && p.firstName && p.lastName) {
                                                    return (
                                                        <li key={idx}>
                                                            {p.rank ? `${p.rank} ` : ""}
                                                            {p.firstName} {p.lastName}
                                                        </li>
                                                    );
                                                }
                                                if (typeof p === "string") {
                                                    return <li key={idx}>{personnelMap[p] || "—"}</li>;
                                                }
                                                return <li key={idx}>—</li>;
                                            })}
                                        </ul>

                                        {t.success_rate !== undefined && (
                                            <p className="mt-3 font-semibold">
                                                Βαθμολογία:{" "}
                                                <span className="font-normal">{t.success_rate}%</span>
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainingList;
