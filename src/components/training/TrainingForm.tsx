import React from "react";
import { useForm } from "react-hook-form";
import { Training } from "../../types/Training";

type TrainingFormProps = {
    onSubmit: (data: Training) => void;
    initialData?: Training;
    personnelList: { id: string; name: string }[];
};

export default function TrainingForm({ onSubmit, initialData, personnelList }: TrainingFormProps) {
    const { register, handleSubmit, reset } = useForm<Training>({
        defaultValues: initialData || {
            id: "",
            description: "",
            location: "",
            from: "",
            to: "",
            personnel: [],
        },
    });

    React.useEffect(() => {
        reset(initialData || {
            id: "",
            description: "",
            location: "",
            from: "",
            to: "",
            personnel: [],
        });
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
            <input {...register("description")} placeholder="Περιγραφή Εκπαίδευσης" className="input" />
            <input {...register("location")} placeholder="Τοποθεσία" className="input" />
            <input {...register("from")} placeholder="Από (2024-01-01)" type="date" className="input" />
            <input {...register("to")} placeholder="Έως (2024-02-01)" type="date" className="input" />

            <label className="block">Προσωπικό που έχει διέλθει:</label>
            <select {...register("personnel")} multiple className="input w-full">
                {personnelList.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>

            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
                Αποθήκευση
            </button>
        </form>
    );
}
