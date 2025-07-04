// app/Controller/Hooks/useFollowChannel.ts

import { useState, useContext } from 'react';
import { followChannel } from '@/app/Model/Services/FollowChannelService';
import { FollowChannelPayload } from '@/app/Model/Entities/FollowChannelPayload';




export const useFollowChannel = (channelId: string) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const follow = async () => {

    setLoading(true);
    setError(null);

    const payload: FollowChannelPayload = {

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
