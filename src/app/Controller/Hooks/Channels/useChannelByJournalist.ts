'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChannelInfo } from '@/app/Model/Entities/ChannelInfo';
import { getChannelByJournalist } from '@/app/Model/Services/GetChannelByJournalistService';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useChannelByJournalist = () => {
  const [channelData, setChannelData] = useState<ChannelInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);

      try {
        const data = await getChannelByJournalist();

        // ✔ Si hay canal → lo guardamos
        if (data) {
          setChannelData(data);
          return;
        }

        // ❌ Si NO hay canal → redirigimos a crear canal
        router.push(ROUTES.CHANNEL_CREATION);

      } catch (err: any) {
        // ❌ Si el error indica que NO hay canal → redirige igual
        if (err.message?.includes('No se encontró el canal')) {
          router.push(ROUTES.CHANNEL_CREATION);
          return;
        }

        console.error('[useChannelByJournalist] Error desconocido:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [router]);

  return { channelData, loading };
};
