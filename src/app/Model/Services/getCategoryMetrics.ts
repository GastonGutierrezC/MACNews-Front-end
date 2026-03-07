
import axios from 'axios';
import { CategoryMetrics } from '../Entities/CategoryMetrics.entity';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.GET_METRICTS_CATEGORY;

export const getCategoryMetrics = async (): Promise<CategoryMetrics[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const response = await axios.get<CategoryMetrics[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('[getCategoryMetrics] Error al obtener métricas de categorías:', error);
    throw new Error('No se pudieron obtener las métricas por categoría');
  }
};
