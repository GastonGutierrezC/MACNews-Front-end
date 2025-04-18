// app/Model/Services/GetAllNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';
import { NewsTopEntity } from '../Entities/FintTopNews';

const API_URL = 'http://localhost:3002/news';

// app/Model/Services/GetTopNewsService.ts
export const getTopNews = async (): Promise<NewsTopEntity[]> => {
  try {
    const response = await axios.get<NewsTopEntity[]>('http://localhost:3002/news');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener top news:', error.message);
    throw new Error('No se pudieron obtener las noticias destacadas');
  }
};
