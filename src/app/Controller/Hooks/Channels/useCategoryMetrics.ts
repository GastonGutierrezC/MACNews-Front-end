import { CategoryMetrics } from '@/app/Model/Entities/CategoryMetrics.entity';
import { getCategoryMetrics } from '@/app/Model/Services/getCategoryMetrics';
import { useState, useEffect } from 'react';


export const useCategoryMetrics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<CategoryMetrics[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryMetrics();
      setMetrics(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener métricas de categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return {
    loading,
    metrics,
    error,
    refetch: fetchMetrics,
  };
};
