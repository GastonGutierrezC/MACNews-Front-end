'use client';

import React from 'react';
import { useUsersRolesReport } from '@/app/Controller/Hooks/Reports/useUsersRolesReport';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export class UsersRolesReportContainer extends React.Component {
  render() {
    return (
      <div className="p-6 border rounded-2xl shadow-xl  text-[#5E83BA] mb-6">
        <h2 className="text-2xl font-extrabold mb-4 tracking-widest">Reporte de Roles de Usuarios</h2>
        <UsersRolesReportViewer />
      </div>
    );
  }
}

const UsersRolesReportViewer = () => {
  const { report, loading, error } = useUsersRolesReport();

  if (loading) return <p className="text-cyan-400 animate-pulse">Cargando reporte...</p>;
  if (error) return <p className="text-red-500 font-bold">{error}</p>;
  if (!report) return <p className="text-gray-300">No hay datos disponibles</p>;

  // Función para calcular porcentaje
  const getPercentage = (value: number) =>
    ((value / report.totalUsers) * 100).toFixed(1);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold">Total Usuarios</p>
          <p className="text-3xl font-bold">{report.totalUsers}</p>
        </div>
        <div className="p-4 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold">Lectores</p>
          <p className="text-2xl font-bold">{report.readers} ({getPercentage(report.readers)}%)</p>
        </div>
        <div className="p-4 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold">Periodistas</p>
          <p className="text-2xl font-bold">{report.journalists} ({getPercentage(report.journalists)}%)</p>
        </div>
            <div className="p-4 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold">Administradores</p>
          <p className="text-2xl font-bold">{report.administrators} ({getPercentage(report.administrators)}%)</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="readers">
          <AccordionTrigger className="bg-[#5E83BA] text-white text-xl rounded-lg shadow-md font-semibold flex justify-center items-center">
            Lectores ({report.readers})
          </AccordionTrigger>
          <AccordionContent className="bg-[#5E83BA] p-4 rounded-lg text-white">
            <ul className="list-disc list-inside space-y-1">
              {report.readerList.map((u, idx) => (
                <li key={idx}>
                  <span className="font-bold">{u.fullName}</span> - {u.email}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="journalists">
          <AccordionTrigger className="bg-[#5E83BA] text-white text-xl rounded-lg shadow-md font-semibold flex justify-center items-center">
            Periodistas ({report.journalists})
          </AccordionTrigger>
          <AccordionContent className="bg-[#5E83BA] p-4 rounded-lg text-white">
            <ul className="list-disc list-inside space-y-1">
              {report.journalistList.map((u, idx) => (
                <li key={idx}>
                  <span className="font-bold">{u.fullName}</span> - {u.email}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="administrators">
          <AccordionTrigger className="bg-[#5E83BA] text-white text-xl rounded-lg shadow-md font-semibold flex justify-center items-center">
            Administradores ({report.administrators})
          </AccordionTrigger>
          <AccordionContent className="bg-[#5E83BA] p-4 rounded-lg text-white">
            <ul className="list-disc list-inside space-y-1">
              {report.administratorList.map((u, idx) => (
                <li key={idx}>
                  <span className="font-bold">{u.fullName}</span> - {u.email}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
