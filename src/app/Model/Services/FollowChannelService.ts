// app/Model/Services/FollowChannelService.ts

import axios from 'axios';
import { FollowChannelPayload } from '../Entities/FollowChannelPayload';

const API_URL = 'http://localhost:3002/followChannels';

export const followChannel = async (payload: FollowChannelPayload): Promise<void> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('No estás autenticado. Inicia sesión para seguir un canal.');
  }

  try {
    await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al seguir el canal.');
  }
};


//http://localhost:3002/channels/top