import axios from 'axios';
import { NewsEntity } from '../Entities/NewsEntity';

const BASE_URL = 'http://localhost:3002/news/specialty';

export const getNewsBySpeciality = async (
  specialty: string,
  page: number = 1,
  limit: number = 10
): Promise<NewsEntity[]> => {
  try {
    const response = await axios.get<NewsEntity[]>(
      `${BASE_URL}/${encodeURIComponent(specialty)}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`[GetNewsBySpecialityService] No se encontraron noticias para la especialidad "${specialty}"`);
      return []; // Retornamos lista vacía si no hay noticias
    }

    console.error(`[GetNewsBySpecialityService] Error al obtener noticias por especialidad:`, error.message);
    throw new Error('No se pudieron obtener las noticias por especialidad');
  }
};
