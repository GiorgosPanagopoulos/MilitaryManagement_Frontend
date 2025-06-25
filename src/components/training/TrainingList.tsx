import React from "react";

type Training = {
  id: string;
  description: string;
  location: string;
  from: string;
  to: string;
  personnel: string[];
};

type Props = {
  data: Training[];
  onEdit: (training: Training) => void;
  onDelete: (id: string) => void;
};

const TrainingList = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Εκπαιδεύσεις</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th>Περιγραφή</th>
            <th>Τοποθεσία</th>
            <th>Διάρκεια</th>
            <th>Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="text-center border-t">
              <td>{t.description}</td>
              <td>{t.location}</td>
              <td>{t.from} έως {t.to}</td>
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
