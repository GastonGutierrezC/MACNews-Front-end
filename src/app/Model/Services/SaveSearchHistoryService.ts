import axios from 'axios';
import { SearchHistory } from '../Entities/SearchHistory';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const BASE_URL = ENDPOINTS.USER_SEARCH_HISTORY;

export const SaveSearchHistoryService = async (
  search: SearchHistory,
  token: string
): Promise<boolean> => {
  try {
    await axios.post(BASE_URL, search, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error: any) {
    console.error('Error al guardar historial de búsqueda:', error.message);
    return false;
  }
};
