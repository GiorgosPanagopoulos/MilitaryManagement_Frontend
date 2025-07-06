import React from "react";
import { Training } from "../../types/Training";

type Props = {
    trainings?: Training[];
    personnelMap: Record<string, string>;
    onEdit: (training: Training) => void;
    onDelete: (id: string) => void;
};

const TrainingList = ({ trainings = [], personnelMap, onEdit, onDelete }: Props) => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Εκπαιδεύσεις</h2>
            <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2">Περιγραφή</th>
                    <th className="px-4 py-2">Τοποθεσία</th>
                    <th className="px-4 py-2">Διάρκεια</th>
                    <th className="px-4 py-2">Προσωπικό</th>
                    <th className="px-4 py-2">Ενέργειες</th>
                </tr>
                </thead>
                <tbody>
                {trainings.map((t) => (
                    <tr key={t.id} className="text-center border-t">
                        <td className="px-4 py-2">{t.description}</td>
                        <td className="px-4 py-2">{t.location}</td>
                        <td className="px-4 py-2">
                            {t.from} έως {t.to}
                        </td>
                        <td className="px-4 py-2">
                            {(t.personnel || [])
                                .map((p: any) =>
                                    typeof p === "string"
                                        ? personnelMap[p] || "—"
                                        : personnelMap[p.id] || "—"
                                )
                                .join(", ")}
                        </td>
                        <td className="px-4 py-2">
                            <button onClick={() => onEdit(t)} className="mr-2 text-blue-500">
                                Edit
                            </button>
                            <button onClick={() => onDelete(t.id)} className="text-red-500">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainingList;
