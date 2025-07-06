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
import axios from "../axios"; // Βεβαιώσου ότι είναι σωστή η διαδρομή

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
    const fetchStats = async () => {
      try {
        const [unitRes, rankRes, trainingRes] = await Promise.all([
          axios.get("/stats/personnel-by-unit"),
          axios.get("/stats/personnel-by-rank"),
          axios.get("/stats/training-participation"),
        ]);

        setPersonnelByUnit(unitRes.data);
        setPersonnelByRank(rankRes.data);
        setTrainingsStats(trainingRes.data);
      } catch (error) {
        console.error("Σφάλμα ανάκτησης στατιστικών:", error);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

  return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Στατιστικά Προσωπικού & Εκπαίδευσης</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded p-4 shadow">
            <h3 className="font-semibold mb-2">Προσωπικό ανά Μονάδα</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={personnelByUnit} dataKey="value" nameKey="name" outerRadius={80} label>
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
                <Pie data={personnelByRank} dataKey="value" nameKey="name" outerRadius={80} label>
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
