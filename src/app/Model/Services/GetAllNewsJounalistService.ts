// app/Model/Services/GetAllNewsJounalistService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const API_URL = "http://localhost:3002/news/channel";

export async function getAllNewsByChannel(channelId: string): Promise<NewsEntity[]> {
  try {
    const response = await axios.get<NewsEntity[]>(`${API_URL}/${channelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by channel:", error);
    throw error;
  }
}