import { useState } from 'react';
import { Visit } from '@/app/Model/Entities/Visit';
import { createVisit } from '@/app/Model/Services/VisitService';

export const useCreateVisit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendVisit = async (visitData: Visit) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await createVisit(visitData);
      setSuccess(result);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    sendVisit,
  };
};
