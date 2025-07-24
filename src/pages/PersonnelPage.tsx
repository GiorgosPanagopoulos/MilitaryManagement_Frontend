import React, { useEffect, useState } from "react";
import axios from "../axios";
import PersonnelForm from "../components/personnel/PersonnelForm";
import PersonnelList from "../components/personnel/PersonnelList";
import { Personnel } from "../types/Personnel";

export default function PersonnelPage() {
    const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
    const [selected, setSelected] = useState<Personnel | null>(null);

    const fetchPersonnel = async () => {
        try {
            const res = await axios.get("/personnel");
            setPersonnelList(res.data);
        } catch (err) {
            console.error("Σφάλμα κατά την ανάκτηση προσωπικού:", err);
        }
    };

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const handleCreateOrUpdate = async (person: Personnel) => {
        try {
            if (person._id) {
                await axios.put(`/personnel/${person._id}`, person);
            } else {
                await axios.post("/personnel", person);
            }
            await fetchPersonnel();
            setSelected(null);
            return person;
        } catch (err) {
            console.error("Σφάλμα κατά την αποθήκευση προσωπικού:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/personnel/${id}`);
            fetchPersonnel();
        } catch (err) {
            console.error("Σφάλμα κατά τη διαγραφή:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left text-gray-800 dark:text-gray-100">
                Διαχείριση Προσωπικού
            </h1>

            <div className="mb-8">
                <PersonnelForm
                    onSubmit={handleCreateOrUpdate}
                    initialData={selected || undefined}
                />
            </div>

            <hr className="my-6 border-gray-300 dark:border-gray-600" />

            <div className="overflow-x-auto">
                <PersonnelList
                    data={personnelList}
                    onEdit={setSelected}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
