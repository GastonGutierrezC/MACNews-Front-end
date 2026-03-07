// app/Model/Services/FollowChannelService.ts

import axios from 'axios';
import { FollowChannelPayload } from '../Entities/FollowChannelPayload';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.FOLLOW_CHANNEL;

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