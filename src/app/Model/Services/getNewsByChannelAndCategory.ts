// src/app/Services/getNewsByChannelAndCategory.ts

import axios from 'axios';
import { NewsByChannelCategoryEntity } from '../Entities/News-by-channel-category.entity';

export async function getNewsByChannelAndCategory(
  channelId: string,
  category: string
): Promise<NewsByChannelCategoryEntity[]> {
  const API_URL = `http://localhost:3002/news/channel/${channelId}/category/${category}`;

  try {
    const response = await axios.get<NewsByChannelCategoryEntity[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by channel and category:", error);
    throw error;
  }
}
