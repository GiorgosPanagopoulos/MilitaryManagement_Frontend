import React, { useEffect, useState } from "react";
import TrainingForm from "../components/training/TrainingForm";
import TrainingList from "../components/training/TrainingList";

type Training = {
  id: string;
  description: string;
  location: string;
  from: string;
  to: string;
  personnel: string[];
};

type Personnel = {
  id: string;
  name: string;
};

export default function TrainingPage() {
  const [data, setData] = useState<Training[]>([]);
  const [editing, setEditing] = useState<Training | null>(null);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);

  // 🔄 Ανάκτηση προσωπικού
  const fetchPersonnel = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/personnel");
      const result = await response.json();
      const formatted = result.map((p: any) => ({
        id: p._id,
        name: `${p.firstName} ${p.lastName}`,
      }));
      setPersonnel(formatted);
    } catch (error) {
      console.error("Error fetching personnel", error);
    }
  };

  useEffect(() => {
    void fetchPersonnel(); // για να εξαφανιστεί το warning
  }, []);

  const handleSave = (training: Training) => {
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
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Εκπαίδευση</h1>

        <TrainingForm
            onSubmit={handleSave}
            initialData={editing || undefined}
            personnelList={personnel}
        />

        <hr className="my-6" />

        <TrainingList
            trainings={data}
            personnelMap={personnel.reduce((acc, p) => {
              acc[p.id] = p.name;
              return acc;
            }, {} as Record<string, string>)}
            onEdit={(training: Training) => setEditing(training)}
            onDelete={handleDelete}
        />
      </div>
  );
}
