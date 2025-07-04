import axios from 'axios';
import { NewsRecommendations } from '../Entities/NewsRecommendations';

export const getAllRecommendationsNews = async (token: string): Promise<NewsRecommendations[]> => {
  const API_URL = `http://localhost:3002/news/recommendations`;

  try {
    const response = await axios.get<NewsRecommendations[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recommendations:', error.message);
    throw error;
  }
};
