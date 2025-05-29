// src/app/Services/getTopChannels.ts

import axios from 'axios';
import { TopChannelEntity } from '../Entities/TopChannelEntity';

const API_URL = 'http://localhost:3002/channels/top';

export async function getTopChannels(): Promise<TopChannelEntity[]> {
  try {
    const response = await axios.get<TopChannelEntity[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching top channels:", error);
    throw error;
  }
}
