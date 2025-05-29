// src/app/Controller/Hooks/Channels/useTopChannels.ts

import { useEffect, useState } from 'react';
import { TopChannelEntity } from '@/app/Model/Entities/TopChannelEntity';
import { getTopChannels } from '@/app/Model/Services/getTopChannels';

export const useTopChannels = () => {
  const [channels, setChannels] = useState<TopChannelEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopChannels();
  }, []);

  const fetchTopChannels = async () => {
    try {
      const data = await getTopChannels();
      // Ordenamos por cantidad de seguidores (opcional)
      const sorted = data.sort((a, b) => b.followers - a.followers);
      setChannels(sorted);
    } catch (err: any) {
      setError(err.message || "Error fetching top channels.");
    } finally {
      setLoading(false);
    }
  };

  return {
    channels,
    loading,
    error,
  };
};
