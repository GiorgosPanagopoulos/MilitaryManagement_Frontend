import React, { useState } from "react";
import TrainingForm from "../components/training/TrainingForm";
import TrainingList from "../components/training/TrainingList";

const mockTrainings = [
  {
    id: "1",
    description: "Βασική Ναυτική Εκπαίδευση",
    location: "ΣΧΝ",
    from: "2024-01-10",
    to: "2024-02-15",
    personnel: ["1"]
  }
];

const personnelList = [
  { id: "1", name: "Γιώργος Πετρίδης" },
  { id: "2", name: "Μαρία Κωνσταντίνου" }
];

export default function TrainingPage() {
  const [data, setData] = useState(mockTrainings);
  const [editing, setEditing] = useState<any>(null);

  const handleSave = (training: any) => {
    if (training.id) {
      setData(data.map(t => (t.id === training.id ? training : t)));
    } else {
      setData([...data, { ...training, id: Date.now().toString() }]);
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(t => t.id !== id));
  };

  return (
    <div className="p-6">
      <TrainingForm onSubmit={handleSave} initialData={editing} personnelList={personnelList} />
      <TrainingList data={data} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
