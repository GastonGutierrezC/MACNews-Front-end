
import axios from 'axios';
import { CategoryMetrics } from '../Entities/CategoryMetrics.entity';

const API_URL = 'http://localhost:3002/news/metrics/categories';

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
