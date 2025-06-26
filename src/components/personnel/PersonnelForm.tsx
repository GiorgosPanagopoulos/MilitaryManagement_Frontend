import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { Personnel } from "../../types/Personnel";

type PersonnelFormProps = {
    onSubmit: (data: Personnel) => Promise<any>;
    initialData?: Personnel;
};

export default function PersonnelForm({ onSubmit, initialData }: PersonnelFormProps) {
    const { register, handleSubmit, reset } = useForm<Personnel>({
        defaultValues: initialData || {},
    });

    const [file, setFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        reset(initialData || {});
    }, [initialData]);

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
        <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-4 p-4 border rounded">
            <input {...register("firstName")} placeholder="Όνομα" className="input" />
            <input {...register("lastName")} placeholder="Επώνυμο" className="input" />
            <input {...register("rank")} placeholder="Βαθμός" className="input" />
            <input {...register("serviceNumber")} placeholder="Αρ. Μητρώου" className="input" />
            <input {...register("phone")} placeholder="Τηλέφωνο" className="input" />
            <input {...register("email")} placeholder="Email" className="input" />
            <input {...register("unit")} placeholder="Μονάδα" className="input" />
            <label>Αρχείο Πτυχίου</label>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Αποθήκευση</button>
        </form>
    );
}
