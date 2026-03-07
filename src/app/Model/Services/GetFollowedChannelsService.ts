// app/Model/Services/GetFollowedChannelsService.ts
import { FollowedChannelEntity } from '@/app/Model/Entities/FollowedChannelEntity';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

export const getFollowedChannels = async (): Promise<FollowedChannelEntity[]> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró el token. El usuario no está autenticado.');
  }

  const response = await fetch(ENDPOINTS.GET_FOLLOWED_CHANNELS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener los canales seguidos: ${response.statusText}`);
  }

  const data: FollowedChannelEntity[] = await response.json();
  return data;
};
