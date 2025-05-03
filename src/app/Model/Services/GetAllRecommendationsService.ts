import axios from 'axios';
import { NewsRecommendations } from '../Entities/NewsRecommendations';

export const getAllRecommendationsNews = async (userId: string): Promise<NewsRecommendations[]> => {
  const API_URL = `http://localhost:3002/news/recommendations/${userId}`;

  try {
    const response = await axios.get<NewsRecommendations[]>(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recommendations:', error.message);
    throw error;
  }
};
