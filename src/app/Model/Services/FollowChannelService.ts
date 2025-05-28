// app/Model/Services/FollowChannelService.ts

import axios from 'axios';
import { FollowChannelPayload } from '../Entities/FollowChannelPayload';

const API_URL = 'http://localhost:3002/followChannels';

export const followChannel = async (payload: FollowChannelPayload): Promise<void> => {
  try {
    await axios.post(API_URL, payload);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al seguir el canal.');
  }
};
