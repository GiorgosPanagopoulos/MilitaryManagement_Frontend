import React from "react";
import { useForm } from "react-hook-form";

type TrainingFormProps = {
  onSubmit: (data: any) => void;
  initialData?: any;
  personnelList: { id: string; name: string }[];
};

export default function TrainingForm({ onSubmit, initialData, personnelList }: TrainingFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    reset(initialData || {});
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
      <input {...register("description")} placeholder="Περιγραφή Εκπαίδευσης" className="input" />
      <input {...register("location")} placeholder="Τοποθεσία" className="input" />
      <input {...register("from")} placeholder="Από (π.χ. 2024-01-01)" className="input" />
      <input {...register("to")} placeholder="Έως (π.χ. 2024-02-01)" className="input" />
      <label>Προσωπικό που έχει διέλθει:</label>
      <select {...register("personnel")} multiple className="input">
        {personnelList.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Αποθήκευση</button>
    </form>
  );
}
