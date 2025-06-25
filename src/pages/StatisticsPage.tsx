import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface TrainingStat {
  training: string;
  participants: number;
  averageScore: number;
}

const StatisticsPage: React.FC = () => {
  const [personnelByUnit, setPersonnelByUnit] = useState<PieData[]>([]);
  const [personnelByRank, setPersonnelByRank] = useState<PieData[]>([]);
  const [trainingsStats, setTrainingsStats] = useState<TrainingStat[]>([]);

  useEffect(() => {
    setPersonnelByUnit([
      { name: "ΚΕ Πόρος", value: 6 },
      { name: "ΝΒ Σαλαμίνας", value: 4 },
      { name: "ΥΝΤΕΛ", value: 2 },
    ]);
    setPersonnelByRank([
      { name: "Σημαιοφόρος", value: 5 },
      { name: "Ανθυποπλοίαρχος", value: 3 },
      { name: "Πλοίαρχος", value: 4 },
    ]);
    setTrainingsStats([
      { training: "ΣΧΝ", participants: 4, averageScore: 8.5 },
      { training: "ΣΝΔ", participants: 2, averageScore: 9.0 },
      { training: "ΣΕΘΑ", participants: 1, averageScore: 7.0 },
    ]);
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Στατιστικά Προσωπικού & Εκπαίδευσης</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Προσωπικό ανά Μονάδα</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={personnelByUnit}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {personnelByUnit.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Προσωπικό ανά Βαθμό</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={personnelByRank}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {personnelByRank.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded p-4 shadow col-span-1 md:col-span-2">
          <h3 className="font-semibold mb-2">Συμμετοχές & Βαθμολογίες Εκπαίδευσης</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainingsStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="training" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#8884d8" name="Συμμετοχές" />
              <Bar dataKey="averageScore" fill="#82ca9d" name="Μ.Ο. Βαθμολογίας" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
