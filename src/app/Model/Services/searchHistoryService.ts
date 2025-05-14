// services/searchHistoryService.ts

import axios from 'axios';
import { SearchHistoryUser } from '../Entities/SearchHistory';


const API_URL = 'http://localhost:3002/searchHistory';

export const getSearchHistoryByUserId = async (userId: string): Promise<SearchHistoryUser[]> => {
  try {
    const response = await axios.get<SearchHistoryUser[]>(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('[getSearchHistoryByUserId] Error al obtener historial de usuario:', error);
    return [];
  }
};
