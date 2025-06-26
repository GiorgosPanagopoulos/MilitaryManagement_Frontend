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
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Προσωπικό</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow rounded">
          <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Ονοματεπώνυμο</th>
            <th className="py-2 px-4 border-b">Βαθμός</th>
            <th className="py-2 px-4 border-b">Μονάδα</th>
            <th className="py-2 px-4 border-b">Ενέργειες</th>
          </tr>
          </thead>
          <tbody>
          {data.map((p) => (
              <tr key={p._id} className="text-center hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b">{p.firstName} {p.lastName}</td>
                <td className="py-2 px-4 border-b">{p.rank}</td>
                <td className="py-2 px-4 border-b">{p.unit}</td>
                <td className="py-2 px-4 border-b flex justify-center space-x-2">
                  <button onClick={() => onEdit(p)} className="text-blue-600 hover:text-blue-800" title="Επεξεργασία">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(p._id!)} className="text-red-600 hover:text-red-800" title="Διαγραφή">
                    <FaTrash />
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default PersonnelList;
