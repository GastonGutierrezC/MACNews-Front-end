// app/Model/Services/GetAllNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const API_URL = 'http://localhost:3002/news/card';

export const getAllNews = async (): Promise<NewsEntity[]> => {
  try {
    const response = await axios.get<NewsEntity[]>(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener noticias:', error.message);
    throw new Error('No se pudieron obtener las noticias');
  }
};
