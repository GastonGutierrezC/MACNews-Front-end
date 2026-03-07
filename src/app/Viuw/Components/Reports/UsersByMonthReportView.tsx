'use client';

import { useUsersByMonthReport } from '@/app/Controller/Hooks/Reports/getUsersByMonthReport';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export class UsersByMonthReportContainer extends React.Component {
  state = {
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div className="p-4  text-[#5E83BA] rounded-xl shadow-xl mb-4 ">
        <h2 className="text-2xl font-bold mb-4">
          Reporte de usuarios registrados en la aplicación
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={this.handleChange}
          className="border rounded px-3 py-2 text-gray-900"
          />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={this.handleChange}
          className="border rounded px-3 py-2 text-gray-900"
          />
        </div>

        {startDate && endDate && (
          <UsersByMonthReportViewer startDate={startDate} endDate={endDate} />
        )}
      </div>
    );
  }
}

const UsersByMonthReportViewer = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { report, loading, error } = useUsersByMonthReport({ startDate, endDate });



  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!report) return <p>No hay datos disponibles</p>;

  const chartData = [
    { name: 'Lectores', value: report.readers },
    { name: 'Periodistas', value: report.journalists },
  ];

  const colors = ['#1e3a8a', '#93c5fd'];

  return (
    <div className="p-4 bg-[#5E83BA] rounded-xl shadow-lg">
      <h2 className="text-lg font-bold  mb-4 text-white">
        Total {report.totalUsers} usuarios
      </h2>



<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
    <XAxis dataKey="name" stroke="#00f6ff" />
    <YAxis allowDecimals={false} stroke="#00f6ff" />
    <Tooltip
      contentStyle={{
        backgroundColor: '#111',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
      }}
      itemStyle={{ color: '#fff' }}
    />
    <Legend wrapperStyle={{ color: '#fff' }} />
    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

    </div>
  );
};
