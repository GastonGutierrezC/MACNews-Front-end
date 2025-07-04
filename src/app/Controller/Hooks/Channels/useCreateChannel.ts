// src/Hooks/useCreateChannel.ts

import { useState } from 'react';
import { createChannel } from '../../../Model/Services/ChannelService';
import { ChannelRequest } from '../../../Model/Entities/Channel';


export const useCreateChannel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const registerChannel = async (
    channelName: string,
    description: string,
    specialties: string[],
    imageURL: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const channelData: ChannelRequest = {
        ChannelName: channelName,
        DescriptionChannel: description,
        Specialties: specialties,
        ChannelImageURL: imageURL,
      };

      const response = await createChannel(channelData);
      console.log('[useCreateChannel] Respuesta del backend:', response);

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Error al crear el canal');
      console.error('[useCreateChannel] Error al registrar canal:', error);
    } finally {
      setLoading(false);
    }
  };

  return { registerChannel, loading, error, success };
};
