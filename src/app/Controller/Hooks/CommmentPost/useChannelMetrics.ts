import { useEffect, useState } from 'react';
import { getChannelMetrics } from '@/app/Model/Services/ChannelMetricsService';
import { ChannelMetric } from '@/app/Model/Entities/ChannelMetric';

export const useChannelMetrics = (channelId: string) => {
  const [metrics, setMetrics] = useState<ChannelMetric[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!channelId) {
          throw new Error('El ID del canal es requerido');
        }

        const data = await getChannelMetrics(channelId);
        if (!data || data.length === 0) {
          throw new Error('No se encontraron métricas para este canal');
        }

        setMetrics(data);
      } catch (err: any) {
        console.error('[useChannelMetrics] Error:', err);
        setError(err.message || 'Error al obtener las métricas');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [channelId]);

  return { metrics, loading, error };
};
