import { SearchHistory } from '@/app/Model/Entities/SearchHistory';
import { SaveSearchHistoryService } from '@/app/Model/Services/SaveSearchHistoryService';
import { useState } from 'react';
import { useToken } from '../../Context/UserContext';


export const useSaveSearchHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token } = useToken();

  const saveSearchHistory = async (search: SearchHistory) => {
    if (!token) {
      setError('No autorizado: token no disponible');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await SaveSearchHistoryService(search, token);

    if (result) {
      setSuccess(true);
    } else {
      setError('No se pudo guardar el historial.');
    }

    setLoading(false);
  };

  return {
    saveSearchHistory,
    loading,
    error,
    success,
  };
};
