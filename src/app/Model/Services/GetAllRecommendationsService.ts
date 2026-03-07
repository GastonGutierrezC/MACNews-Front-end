import axios from 'axios';
import { NewsRecommendations } from '../Entities/NewsRecommendations';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

export const getAllRecommendationsNews = async (token: string): Promise<NewsRecommendations[]> => {
  const API_URL = ENDPOINTS.NEWS_RECOMMENDATIONS;

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
