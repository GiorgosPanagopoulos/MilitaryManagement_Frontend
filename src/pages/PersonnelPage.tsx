import React from "react";

// Ορισμός τύπου για το προσωπικό
export interface Personnel {
  _id?: string;
  firstName: string;
  lastName: string;
  rank: string;
  serviceNumber: string;
  phone: string;
  email: string;
  unit: string;
}

// Props που παίρνει το component
interface Props {
  data: Personnel[];
  onEdit: (person: Personnel) => void;
  onDelete: (id: string) => void;
}

export default function PersonnelList({ data, onEdit, onDelete }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Καταχωρημένο Προσωπικό</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Όνομα</th>
            <th className="p-2 border">Επώνυμο</th>
            <th className="p-2 border">Βαθμός</th>
            <th className="p-2 border">Αρ. Μητρώου</th>
            <th className="p-2 border">Μονάδα</th>
            <th className="p-2 border">Τηλέφωνο</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person._id ?? person.email}>
              <td className="p-2 border">{person.firstName}</td>
              <td className="p-2 border">{person.lastName}</td>
              <td className="p-2 border">{person.rank}</td>
              <td className="p-2 border">{person.serviceNumber}</td>
              <td className="p-2 border">{person.unit}</td>
              <td className="p-2 border">{person.phone}</td>
              <td className="p-2 border">{person.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => onEdit(person)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Επεξεργασία
                </button>
                <button
                  onClick={() => person._id && onDelete(person._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Διαγραφή
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
