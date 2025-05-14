import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const BASE_URL = 'http://localhost:3002/news/category';

export const getNewsByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<NewsEntity[]> => {
  try {
    const response = await axios.get<NewsEntity[]>(
      `${BASE_URL}/${encodeURIComponent(category)}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`[GetNewsByCategoryService] No se encontraron noticias para la categoría "${category}"`);
      return []; // Retornamos lista vacía si no hay noticias
    }

    console.error(`[GetNewsByCategoryService] Error al obtener noticias por categoría:`, error.message);
    throw new Error('No se pudieron obtener las noticias por categoría');
  }
};
