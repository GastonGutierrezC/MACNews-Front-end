import { unfollowChannel } from '@/app/Model/Services/UnfollowChannelService';
import { useState } from 'react';


export const useUnfollowChannel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const removeFollow = async (channelId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("[useUnfollowChannel] ChannelID recibido:", channelId);

      const response = await unfollowChannel(channelId);
      console.log("[useUnfollowChannel] Respuesta del backend:", response);

      setSuccess(true);
    } catch (error: any) {
      console.error("[useUnfollowChannel] Error al desuscribirse:", error);
      setError(error.message || "Error al desuscribirse del canal");
    } finally {
      setLoading(false);
    }
  };

  return { removeFollow, loading, error, success };
};
