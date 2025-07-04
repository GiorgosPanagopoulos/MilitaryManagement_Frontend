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
                    <th>Περιγραφή</th>
                    <th>Τοποθεσία</th>
                    <th>Διάρκεια</th>
                    <th>Προσωπικό</th>
                    <th>Ενέργειες</th>
                </tr>
                </thead>
                <tbody>
                {trainings.map((t) => (
                    <tr key={t.id} className="text-center border-t">
                        <td>{t.description}</td>
                        <td>{t.location}</td>
                        <td>
                            {t.from} έως {t.to}
                        </td>
                        <td>{(t.personnel || []).map(pid => personnelMap[pid] || pid).join(", ")}</td>
                        <td>
                            <button onClick={() => onEdit(t)} className="mr-2 text-blue-500">Edit</button>
                            <button onClick={() => onDelete(t.id)} className="text-red-500">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainingList;
