// app/Controller/Hooks/useFollowedChannels.ts
import { useState, useEffect } from 'react';
import { FollowedChannelEntity } from '@/app/Model/Entities/FollowedChannelEntity';
import { getFollowedChannels } from '@/app/Model/Services/GetFollowedChannelsService';
import { useUser } from '@/app/Controller/Context/UserContext';

export const useFollowedChannels = () => {
    const { user, setJournalist, setUser } = useUser();
  const [channels, setChannels] = useState<FollowedChannelEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchChannels = async () => {
      setLoading(true);
      try {
        const data = await getFollowedChannels(user.id);
        setChannels(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [user]);

  return {
    channels,
    loading,
    error,
  };
};
