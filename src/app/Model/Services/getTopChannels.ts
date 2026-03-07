// src/app/Services/getTopChannels.ts

import axios from 'axios';
import { TopChannelEntity } from '../Entities/TopChannelEntity';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.GET_TOP_CHANNELS;

export async function getTopChannels(): Promise<TopChannelEntity[]> {
  try {
    const response = await axios.get<TopChannelEntity[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching top channels:", error);
    throw error;
  }
}
