// app/Controller/Hooks/useFollowChannel.ts

import { useState, useContext } from 'react';
import { followChannel } from '@/app/Model/Services/FollowChannelService';
import { FollowChannelPayload } from '@/app/Model/Entities/FollowChannelPayload';
import { useUser } from '@/app/Controller/Context/UserContext';



export const useFollowChannel = (channelId: string) => {
  const { user, setJournalist, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const follow = async () => {
    if (!user?.id) {
      setError('Usuario no autenticado.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload: FollowChannelPayload = {
      UserID: user.id,
      ChannelID: channelId,
    };

    try {
      await followChannel(payload);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    follow,
    loading,
    error,
  };
};
