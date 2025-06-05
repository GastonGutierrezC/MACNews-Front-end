import { useState } from 'react';
import { createJournalist } from '../../../Model/Services/JournalistService';
import { JournalistRequest } from '../../../Model/Entities/Journalist';
import { useUser } from '@/app/Controller/Context/UserContext';

export const useCreateJournalist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { user, setJournalistAndPromote } = useUser();

  const registerJournalist = async (specialty: string, experience: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!user || !user.id) {
        throw new Error('Usuario no autenticado. No se puede crear periodista.');
      }

      const journalistData: JournalistRequest = {
        UserID: user.id,
        Specialty: specialty,
        JournalisticExperience: experience,
      };

      const response = await createJournalist(journalistData);
      console.log('[useCreateJournalist] Respuesta del backend:', response);

      if (!response?.JournalistID) {
        throw new Error('Respuesta inválida del servidor: falta JournalistID');
      }

      setJournalistAndPromote({ JournalistID: response.JournalistID });

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
