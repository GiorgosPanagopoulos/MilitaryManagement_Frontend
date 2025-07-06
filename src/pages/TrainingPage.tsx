import React, { useEffect, useState } from "react";
import TrainingForm from "../components/training/TrainingForm";
import TrainingList from "../components/training/TrainingList";
import { Training } from "../types/Training";

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
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Missing token");

            const response = await fetch("http://localhost:5001/api/personnel", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            const formatted = result.map((p: any) => ({
                id: p._id,
                name: `${p.firstName} ${p.lastName}`,
            }));

            setPersonnel(formatted);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        }
    };

    // 🔄 Ανάκτηση εκπαιδεύσεων
    const fetchTrainings = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Missing token");

            const response = await fetch("http://localhost:5001/api/training", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            const formatted = result.map((t: any) => ({
                id: t._id,
                description: t.description,
                location: t.location,
                from: t.from_date?.slice(0, 10),
                to: t.to_date?.slice(0, 10),
                personnel:
                    t.personnel?.map((p: any) => ({
                        id: p._id,
                        name: `${p.firstName} ${p.lastName}`,
                    })) || [],
            }));

            setData(formatted);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    useEffect(() => {
        void fetchPersonnel();
        void fetchTrainings();
    }, []);

    // ✅ Αποθήκευση ή ενημέρωση εκπαίδευσης
    const handleSave = async (training: Training) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Missing token");

            const payload = {
                description: training.description,
                location: training.location,
                from_date: training.from,
                to_date: training.to,
                personnel: (training.personnel ?? []).map((p: any) =>
                    typeof p === "string" ? p : p.id
                ),
            };

            const response = await fetch(
                training.id
                    ? `http://localhost:5001/api/training/${training.id}`
                    : "http://localhost:5001/api/training",
                {
                    method: training.id ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) throw new Error("Failed to save training");

            await fetchTrainings();
            setEditing(null);
        } catch (error) {
            console.error("Error saving training:", error);
        }
    };

    // 🗑️ Διαγραφή εκπαίδευσης
    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Missing token");

            const response = await fetch(
                `http://localhost:5001/api/training/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to delete training");

            await fetchTrainings();
        } catch (error) {
            console.error("Error deleting training:", error);
        }
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
                onEdit={(training) =>
                    setEditing({
                        ...training,
                        personnel: (training.personnel ?? []).map((p: any) =>
                            typeof p === "string" ? p : p.id
                        ),
                    })
                }
                onDelete={handleDelete}
            />
        </div>
    );
}
