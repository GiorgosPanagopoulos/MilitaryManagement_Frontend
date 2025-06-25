import React from "react";

type Personnel = {
  id: string;
  firstName: string;
  lastName: string;
  rank: string;
  registryNumber: string;
  phone: string;
  email: string;
  unit: string;
};

type Props = {
  data: Personnel[];
  onEdit: (person: Personnel) => void;
  onDelete: (id: string) => void;
};

const PersonnelList = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Προσωπικό</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th>Ονοματεπώνυμο</th>
            <th>Βαθμός</th>
            <th>Μονάδα</th>
            <th>Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.firstName} {p.lastName}</td>
              <td>{p.rank}</td>
              <td>{p.unit}</td>
              <td>
                <button onClick={() => onEdit(p)} className="mr-2 text-blue-500">Edit</button>
                <button onClick={() => onDelete(p.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelList;
