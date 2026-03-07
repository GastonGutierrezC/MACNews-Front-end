// app/Model/Services/GetAllNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';
import { NewsTopEntity } from '../Entities/FintTopNews';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.NEWS_GET_TOP;

// app/Model/Services/GetTopNewsService.ts
export const getTopNews = async (): Promise<NewsTopEntity[]> => {
  try {
    const response = await axios.get<NewsTopEntity[]>(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener top news:', error.message);
    throw new Error('No se pudieron obtener las noticias destacadas');
  }
};
