'use client';

import { useUsersActivityReport } from '@/app/Controller/Hooks/Reports/useUsersActivityReport';
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#14b8a6', '#ff0000']; // Verde azulado y naranja llamativo

export const UsersActivityReportContainer: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const { report, loading, error } = useUsersActivityReport(startDate, endDate);

  const chartData =
    report
      ? [
          { name: `Activos (${report.activeUsers})`, value: report.percentActive },
          { name: `Inactivos (${report.inactiveUsers})`, value: report.percentInactive },
        ]
      : [];

  return (
    <div className="p-6 text-[#5E83BA] rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 ">Reporte de Actividad de Usuarios</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-3 py-2 text-gray-900"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-3 py-2 text-gray-900"
        />
      </div>

      {loading && <p>Cargando reporte...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {report && (
        <div className="bg-[#5E83BA]   p-4 rounded-xl shadow-lg">
          <p className="mb-4 font-medium text-lg  text-white">
            Total de usuarios: <span >{report.totalUsers}</span>
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value}% usuarios`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
