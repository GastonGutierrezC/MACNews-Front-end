'use client';

import React from "react";
import { toast } from 'sonner';
import { useUsersPendingApplicationReport } from "@/app/Controller/Hooks/Reports/useUsersPendingApplicationReport";
import { useChangeUserRole } from "@/app/Controller/Hooks/JournalistForm/useChangeUserRole";
import { useVerifyApplication } from "@/app/Controller/Hooks/JournalistForm/useVerifyApplication";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const UsersPendingApplicationReportTable: React.FC = () => {
  const { data, loading, error, refreshData } = useUsersPendingApplicationReport();
  const { updateRole, loading: roleLoading, error: roleError, success: successRole } = useChangeUserRole();
  const { verifyForm, loading: verifyLoading, error: verifyError, success: successVerify } = useVerifyApplication();

  const handleAccept = async (userId: string, applicationId: string) => {
    try {
      await updateRole(userId, 'Journalist');
      await verifyForm(applicationId, 'Approved');

      // Usamos los estados success de los hooks
      if (successRole && successVerify) {
        toast.success('Usuario aprobado correctamente');
        refreshData(); // Refrescar la lista de usuarios pendientes
      } else {
        toast.error('Error al aprobar el usuario');
      }
    } catch (err) {
      console.error(err);
      toast.error('Ocurrió un error al aprobar el usuario');
    }
  };

  if (loading) return <p className="text-blue-500">Cargando reporte...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 rounded-xl shadow-lg text-[#5E83BA]">
      <h2 className="text-2xl font-bold mb-6">Usuarios con aplicación pendiente</h2>
      {data && data.length > 0 ? (
        <Accordion type="single" collapsible>
          {data.map((user) => (
            <AccordionItem key={user.userId} value={user.userId}>
              <AccordionTrigger className="text-xl bg-gradient-to-r bg-[#5E83BA] to-pink-500 text-white flex justify-center items-center">
                {user.fullName}
              </AccordionTrigger>
              <AccordionContent className="bg-[#5E83BA] rounded-b-lg text-black flex flex-col items-center text-xl">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Fecha de nacimiento:</strong> {user.birthDate}</p>
                <p><strong>Número de CI:</strong> {user.cardNumber}</p>
                <p><strong>Motivo:</strong> {user.reason}</p>
                <p><strong>Estado de verificación:</strong> {user.verificationStatus}</p>
                <p><strong>Fecha de aplicación:</strong> {new Date(user.applicationDate).toLocaleDateString()}</p>
                <p className="mt-2"><strong>Certificado:</strong></p>
                <img 
                  src={user.imageCertificateURL} 
                  alt="Certificado" 
                  className="w-80 h-auto rounded-md my-4" 
                />
                <button
                  onClick={() => handleAccept(user.userId, user.aplicationId)}
                  className="mt-3 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-xl transition-colors"
                  disabled={roleLoading || verifyLoading}
                >
                  {roleLoading || verifyLoading ? 'Procesando...' : 'Aceptar'}
                </button>
                {(roleError || verifyError) && (
                  <p className="text-red-500 mt-2">{roleError || verifyError}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-400">No hay usuarios pendientes</p>
      )}
    </div>
  );
};

export default UsersPendingApplicationReportTable;
