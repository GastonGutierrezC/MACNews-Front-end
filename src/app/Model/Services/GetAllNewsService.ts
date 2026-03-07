// app/Model/Services/GetAllNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const BASE_URL = ENDPOINTS.NEWS_ALL_CARD;

export const getAllNews = async (page: number = 1, limit: number = 10): Promise<NewsEntity[]> => {
  try {
    const response = await axios.get<NewsEntity[]>(`${BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener noticias:', error.message);
    throw new Error('No se pudieron obtener las noticias');
  }
};

// http://localhost:3002/news/card/update-by-agent