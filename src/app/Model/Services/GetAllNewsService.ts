// app/Model/Services/GetAllNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const BASE_URL = 'http://localhost:3002/news/card';

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