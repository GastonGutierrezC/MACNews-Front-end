import axios from 'axios';
import { Visit } from '../Entities/Visit';

const API_URL = 'http://localhost:3002/visits';

export const createVisit = async (visitData: Visit): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const response = await axios.post(API_URL, visitData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const success = response.data === true;

    if (success) {
      console.log('[createVisit] Visita registrada con éxito.');
    } else {
      console.warn('[createVisit] El backend no devolvió true.');
    }

    return success;
  } catch (error) {
    console.error('[createVisit] Error al crear la visita:', error);
    throw new Error('No se pudo crear la visita');
  }
};
