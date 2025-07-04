// services/searchHistoryService.ts

import axios from 'axios';
import { SearchHistoryUser } from '../Entities/SearchHistory';

const API_URL = 'http://localhost:3002/searchHistory';

export const getSearchHistoryByToken = async (token: string): Promise<SearchHistoryUser[]> => {
  try {
    const response = await axios.get<SearchHistoryUser[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[getSearchHistoryByToken] Error al obtener historial de usuario:', error);
    return [];
  }
};
