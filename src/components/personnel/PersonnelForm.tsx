
import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { Personnel } from "../../types/Personnel";

type PersonnelFormProps = {
    onSubmit: (data: Personnel) => Promise<any>;
    initialData?: Personnel;
};

export default function PersonnelForm({
                                          onSubmit,
                                          initialData,
                                      }: PersonnelFormProps) {
    const { register, handleSubmit, reset } = useForm<Personnel>({
        defaultValues: initialData || {},
    });

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        reset(initialData || {});
    }, [initialData, reset]);

    const handleFileUpload = async (id: string) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            await axios.post(`/uploads/personnel/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
    };

    const onFinalSubmit = async (data: Personnel) => {
        const response = await onSubmit(data);
        const id = response._id || response.id;
        if (id) {
            await handleFileUpload(id);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onFinalSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded shadow bg-white"
        >
            <input
                {...register("firstName")}
                placeholder="Όνομα"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("lastName")}
                placeholder="Επώνυμο"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("rank")}
                placeholder="Βαθμός"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("serviceNumber")}
                placeholder="Αρ. Μητρώου"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("phone")}
                placeholder="Τηλέφωνο"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="input w-full border p-2 rounded"
            />
            <input
                {...register("unit")}
                placeholder="Μονάδα"
                className="input w-full border p-2 rounded"
            />
            <div className="flex flex-col sm:col-span-2">
                <label className="mb-1 font-medium">Αρχείο Πτυχίου</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full"
                />
            </div>
            <div className="sm:col-span-2 flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Αποθήκευση
                </button>
            </div>
        </form>
    );
}
