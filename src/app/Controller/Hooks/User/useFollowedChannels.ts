import { useState, useEffect, useCallback } from 'react';
import { FollowedChannelEntity } from '@/app/Model/Entities/FollowedChannelEntity';
import { getFollowedChannels } from '@/app/Model/Services/GetFollowedChannelsService';
import { useUser } from '@/app/Controller/Context/UserContext';

export const useFollowedChannels = () => {
  const { user } = useUser();
  const [channels, setChannels] = useState<FollowedChannelEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getFollowedChannels(user.id);
      setChannels(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return {
    channels,
    loading,
    error,
    refreshChannels: fetchChannels, // 👈 esta función es la clave
  };
};
