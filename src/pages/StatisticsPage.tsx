
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
import axios from "../axios";

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
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    setTheme(html.classList.contains("dark") ? "dark" : "light");
  }, []);

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

  const COLORS = ["#4f46e5", "#16a34a", "#eab308", "#f97316", "#0ea5e9", "#22c55e"];
  const getTextColor = () => (theme === "dark" ? "#f9fafb" : "#111827");
  const getBgColor = () => (theme === "dark" ? "#1f2937" : "#ffffff");

  const renderUnitLabel = ({
                             cx,
                             cy,
                             midAngle,
                             innerRadius,
                             outerRadius,
                             index,
                           }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    const name = personnelByUnit[index]?.name || "";

    return (
        <text
            x={x}
            y={y}
            fill={getTextColor()}
            fontSize={12}
            textAnchor="middle"
            dominantBaseline="central"
        >
          {name}
        </text>
    );
  };

  const renderRankLabel = ({
                             cx,
                             cy,
                             midAngle,
                             innerRadius,
                             outerRadius,
                             index,
                           }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    const name = personnelByRank[index]?.name || "";

    return (
        <text
            x={x}
            y={y}
            fill={getTextColor()}
            fontSize={12}
            textAnchor="middle"
            dominantBaseline="central"
        >
          {name}
        </text>
    );
  };

  return (
      <div className="p-4 md:p-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">
          📊 Στατιστικά Προσωπικού & Εκπαίδευσης
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie - Προσωπικό ανά Μονάδα */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Προσωπικό ανά Μονάδα
            </h3>
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={personnelByUnit}
                      dataKey="value"
                      nameKey="name"
                      outerRadius="80%"
                      label={renderUnitLabel}
                  >
                    {personnelByUnit.map((_, index) => (
                        <Cell
                            key={`unit-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                  </Pie>
                  <Tooltip
                      contentStyle={{
                        backgroundColor: getBgColor(),
                        color: getTextColor(),
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                      labelStyle={{ color: getTextColor() }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie - Προσωπικό ανά Βαθμό */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Προσωπικό ανά Βαθμό
            </h3>
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={personnelByRank}
                      dataKey="value"
                      nameKey="name"
                      outerRadius="80%"
                      label={renderRankLabel}
                  >
                    {personnelByRank.map((_, index) => (
                        <Cell
                            key={`rank-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                  </Pie>
                  <Tooltip
                      contentStyle={{
                        backgroundColor: getBgColor(),
                        color: getTextColor(),
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                      labelStyle={{ color: getTextColor() }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar - Εκπαίδευση */}
          <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Συμμετοχές & Μ.Ο. Βαθμολογίας Εκπαίδευσης
            </h3>
            <div className="w-full h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={trainingsStats}
                    margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis
                      dataKey="training"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={100}
                      tick={{
                        fill: getTextColor(),
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                  />
                  <YAxis
                      tick={{
                        fill: getTextColor(),
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                  />
                  <Tooltip
                      contentStyle={{
                        backgroundColor: getBgColor(),
                        color: getTextColor(),
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                      labelStyle={{ color: getTextColor() }}
                  />
                  <Legend wrapperStyle={{ color: getTextColor() }} />
                  <Bar dataKey="participants" fill="#4f46e5" name="Συμμετοχές" />
                  <Bar dataKey="averageScore" fill="#16a34a" name="Μ.Ο. Βαθμολογίας" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StatisticsPage;
