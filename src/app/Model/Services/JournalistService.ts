// src/Services/JournalistService.ts

import axios from 'axios';
import { JournalistRequest } from '../Entities/Journalist';

const API_URL = 'http://localhost:3002/journalist';

export const createJournalist = async (
  journalistData: JournalistRequest
): Promise<string> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No hay token disponible');

    console.log("Enviando datos del periodista:", journalistData);

    const response = await axios.post<{ token: string }>(API_URL, journalistData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newToken = response.data.token;
    if (!newToken) throw new Error('No se recibió un nuevo token');

    // Guardar el nuevo token en localStorage
    localStorage.setItem('token', newToken);

    console.log("Nuevo token recibido:", newToken);
    return newToken;
  } catch (error: any) {
    console.error("Error al crear el periodista:", error.message || error);
    throw new Error("No se pudo crear el periodista");
  }
};
