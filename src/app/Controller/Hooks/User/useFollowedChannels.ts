import { useState, useEffect, useCallback } from 'react';
import { FollowedChannelEntity } from '@/app/Model/Entities/FollowedChannelEntity';
import { getFollowedChannels } from '@/app/Model/Services/GetFollowedChannelsService';

export const useFollowedChannels = () => {
  const [channels, setChannels] = useState<FollowedChannelEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const data = await getFollowedChannels();
      setChannels(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return {
    channels,
    loading,
    error,
    refreshChannels: fetchChannels,
  };
};
