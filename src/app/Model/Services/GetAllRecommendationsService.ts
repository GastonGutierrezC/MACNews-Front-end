// app/Model/Services/GetAllRecommendationsService.ts

import axios from 'axios';
import { NewsRecommendations } from '../Entities/NewsRecommendations';

export const getAllRecommendationsNews = async (userId: string): Promise<NewsRecommendations[]> => {
  try {
    const API_URL = `http://localhost:3002/news/recommendations/${userId}`;
    const response = await axios.get<NewsRecommendations[]>(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener noticias recomendadas:', error.message);
    throw new Error('No se pudieron obtener las noticias recomendadas');
  }
};
