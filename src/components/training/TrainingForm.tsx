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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 sm:p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
        >
            <div>
                <input
                    {...register("description")}
                    placeholder="Περιγραφή Εκπαίδευσης"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm sm:text-base"
                />
            </div>

            <div>
                <input
                    {...register("location")}
                    placeholder="Τοποθεσία"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm sm:text-base"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    {...register("from")}
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm"
                />
                <input
                    {...register("to")}
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <input
                    {...register("success_rate", { valueAsNumber: true })}
                    type="number"
                    placeholder="Βαθμολογία (0-100)"
                    min={0}
                    max={100}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label
                    htmlFor="personnel"
                    className="block font-semibold mb-1 dark:text-gray-200"
                >
                    Προσωπικό που έχει διέλθει:
                </label>
                <select
                    id="personnel"
                    {...register("personnel")}
                    multiple
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded px-3 py-2 text-sm h-32"
                >
                    {personnelList.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Αποθήκευση
                </button>
            </div>
        </form>
    );
}
