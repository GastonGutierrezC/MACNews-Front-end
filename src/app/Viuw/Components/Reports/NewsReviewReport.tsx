"use client";

import React, { useState } from "react";
import { useNewsReviewReport } from "@/app/Controller/Hooks/Reports/useNewsReviewReport";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0fbcf9", "#ff6b6b"]; // Aprobadas, Rechazadas, Revisadas

const NewsReviewReportComponent: React.FC = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(formatDate(firstDay));
  const [endDate, setEndDate] = useState(formatDate(lastDay));

  const { report, loading, error } = useNewsReviewReport(startDate, endDate);

  const data = report
    ? [
        { name: `Aprobadas (${report.totalApproved})`, value: report.totalApproved },
        { name: `Rechasadas (${report.totalRejected})`, value: report.totalRejected },
      ]
    : [];

  return (
    <div className="p-6 rounded-xl shadow-xl text-[#5E83BA] ">
      <h2 className="text-2xl font-extrabold mb-4 text-center">Reporte de Noticias</h2>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-md p-2 border-0 text-black"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-md p-2 border-0 text-black"
        />
      </div>

      {loading && <p className="text-center text-yellow-300">Cargando reporte...</p>}
      {error && <p className="text-center text-red-400">Error: {error.message}</p>}

      {report && (
        <div className="bg-[#5E83BA] p-6 rounded-xl shadow-inner">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ color: "white", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default NewsReviewReportComponent;
