'use client';

import { useEffect, useState } from 'react';
import { ChannelInfo } from '@/app/Model/Entities/ChannelInfo';
import { useUser } from '@/app/Controller/Context/UserContext';
import { getChannelByJournalistId } from '@/app/Model/Services/GetChannelByJournalistService';

export const useChannelByJournalist = () => {
  const [channelData, setChannelData] = useState<ChannelInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // accedemos al usuario completo

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);
      setError(null);

      try {
        const journalistID = user?.JournalistID;
        if (!journalistID) {
          throw new Error('No se encontró el ID del periodista en el contexto');
        }

        const data = await getChannelByJournalistId(journalistID);
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
  }, [user]);

  return { channelData, loading, error };
};
