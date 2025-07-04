'use client';

import { useEffect, useState } from 'react';
import { ChannelInfo } from '@/app/Model/Entities/ChannelInfo';
import { getChannelByJournalist } from '@/app/Model/Services/GetChannelByJournalistService';

export const useChannelByJournalist = () => {
  const [channelData, setChannelData] = useState<ChannelInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getChannelByJournalist();
        if (!data) {
          throw new Error('No se encontró el canal para este periodista');
        }

        setChannelData(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el canal del periodista');
        console.error('[useChannelByJournalist] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  return { channelData, loading, error };
};
