import React from "react";
import { useForm } from "react-hook-form";
import { Training } from "../../types/Training";

type TrainingFormProps = {
    onSubmit: (data: Training) => void;
    initialData?: Training;
    personnelList: { id: string; name: string }[];
};

export default function TrainingForm({
                                         onSubmit,
                                         initialData,
                                         personnelList,
                                     }: TrainingFormProps) {
    const { register, handleSubmit, reset } = useForm<Training>({
        defaultValues: initialData || {
            id: "",
            description: "",
            location: "",
            from: "",
            to: "",
            personnel: [],
            success_rate: undefined,
        },
    });

    React.useEffect(() => {
        reset(
            initialData || {
                id: "",
                description: "",
                location: "",
                from: "",
                to: "",
                personnel: [],
                success_rate: undefined,
            }
        );
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
            <input
                {...register("description")}
                placeholder="Περιγραφή Εκπαίδευσης"
                className="input w-full"
            />

            <input
                {...register("location")}
                placeholder="Τοποθεσία"
                className="input w-full"
            />

            <input
                {...register("from")}
                type="date"
                placeholder="Από (π.χ. 2025-01-01)"
                className="input w-full"
            />

            <input
                {...register("to")}
                type="date"
                placeholder="Έως (π.χ. 2025-02-01)"
                className="input w-full"
            />

            <input
                {...register("success_rate", { valueAsNumber: true })}
                type="number"
                placeholder="Βαθμολογία (0-100)"
                min={0}
                max={100}
                className="input w-full"
            />

            <label className="block font-semibold">Προσωπικό που έχει διέλθει:</label>
            <select
                {...register("personnel")}
                multiple
                className="input w-full"
            >
                {personnelList.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
                Αποθήκευση
            </button>
        </form>
    );
}