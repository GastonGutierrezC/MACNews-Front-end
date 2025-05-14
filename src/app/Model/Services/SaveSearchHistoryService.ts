import axios from 'axios';
import { SearchHistory } from '../Entities/SearchHistory';

const BASE_URL = 'http://localhost:3002/searchHistory';

export const SaveSearchHistoryService = async (search: SearchHistory): Promise<boolean> => {
  try {
    await axios.post(BASE_URL, search);
    return true;
  } catch (error: any) {
    console.error('Error al guardar historial de búsqueda:', error.message);
    return false;
  }
};
