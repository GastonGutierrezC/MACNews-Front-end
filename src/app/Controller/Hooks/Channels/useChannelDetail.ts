// src/app/Controller/Hooks/Channels/useChannelByNameAndCreator.ts

import { ChannelDetail } from '@/app/Model/Entities/ChannelDetailEntity';
import { getChannelByNameAndCreator } from '@/app/Model/Services/GetChannelDetailService';
import { useEffect, useState } from 'react';

export const useChannelByNameAndCreator = (channelName: string, creatorFullName: string) => {
  const [channelData, setChannelData] = useState<ChannelDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!channelName || !creatorFullName) {
          throw new Error('Faltan parámetros: channelName o creatorFullName');
        }

        const data = await getChannelByNameAndCreator(channelName, creatorFullName);
        if (!data) {
          throw new Error('No se encontró el canal con los datos proporcionados');
        }

        setChannelData(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el canal');
        console.error('[useChannelByNameAndCreator] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelName, creatorFullName]);

  return { channelData, loading, error };
};
