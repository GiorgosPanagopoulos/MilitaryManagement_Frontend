
import React, { useEffect, useState } from "react";
import axios from "../axios";
import PersonnelForm from "../components/personnel/PersonnelForm";
import PersonnelList from "../components/personnel/PersonnelList";
import { Personnel } from "../types/Personnel";

export default function PersonnelPage() {
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  const [selected, setSelected] = useState<Personnel | null>(null);

  const fetchPersonnel = async () => {
    const res = await axios.get("/personnel");
    setPersonnelList(res.data);
  };

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const handleCreateOrUpdate = async (person: Personnel) => {
    if (person._id) {
      await axios.put(`/personnel/${person._id}`, person);
    } else {
      await axios.post("/personnel", person);
    }
    fetchPersonnel();
    setSelected(null);
    return person;
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/personnel/${id}`);
    fetchPersonnel();
  };

  return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Διαχείριση Προσωπικού</h1>
        <PersonnelForm
            onSubmit={handleCreateOrUpdate}
            initialData={selected || undefined}
        />
        <hr className="my-6" />
        <PersonnelList
            data={personnelList}
            onEdit={setSelected}
            onDelete={handleDelete}
        />
      </div>
  );
}
