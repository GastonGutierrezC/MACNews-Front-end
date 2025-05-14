// app/Model/Services/SearchIntelligentNewsService.ts

import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const BASE_URL = 'http://localhost:3002/news/searchIntelligent';

export const searchIntelligentNews = async (text: string): Promise<NewsEntity[]> => {
  if (!text || text.trim() === '') return [];

  try {
    const response = await axios.get<NewsEntity[]>(`${BASE_URL}?text=${encodeURIComponent(text)}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al realizar la búsqueda inteligente:', error.message);
    return [];
  }
};
