import { useState } from 'react';
import { createJournalist } from '../../../Model/Services/JournalistService';
import { JournalistRequest } from '../../../Model/Entities/Journalist';


export const useCreateJournalist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const registerJournalist = async (specialty: string, experience: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const journalistData: JournalistRequest = {
        Specialty: specialty,
        JournalisticExperience: experience,
      };

      const newToken = await createJournalist(journalistData);
      console.log('[useCreateJournalist] Nuevo token recibido:', newToken);

      // Ya se guarda automáticamente el token en localStorage dentro del servicio
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Error al crear el periodista');
      console.error('[useCreateJournalist] Error al registrar periodista:', error);
    } finally {
      setLoading(false);
    }
  };

  return { registerJournalist, loading, error, success };
};
