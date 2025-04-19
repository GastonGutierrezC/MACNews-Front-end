import axios from 'axios';
import { NewsRecommendations } from '../Entities/NewsRecommendations';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllRecommendationsNews = async (userId: string): Promise<NewsRecommendations[]> => {
  const API_URL = `http://localhost:3002/news/recommendations/${userId}`;

  while (true) {
    try {
      const response = await axios.get<NewsRecommendations[]>(API_URL);
      return response.data;
    } catch (error: any) {
      await delay(2000); 
    }
  }
};
