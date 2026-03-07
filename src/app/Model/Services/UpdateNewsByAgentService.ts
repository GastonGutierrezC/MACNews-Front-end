import axios from 'axios';
import { NewsUpdateRequest, NewsUpdateResponse } from '../Entities/NewsUpdateRequest';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';


const API_URL = ENDPOINTS.NEWS_UPDATE_BY_AGENT;

export const updateNewsByAgent = async (
  data: NewsUpdateRequest
): Promise<NewsUpdateResponse> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const response = await axios.post<NewsUpdateResponse>(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al actualizar la noticia con agente:', error);
    throw error;
  }
};
