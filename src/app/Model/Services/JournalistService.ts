// src/Services/JournalistService.ts

import axios from 'axios';
import { JournalistRequest, JournalistResponse } from '../Entities/Journalist';

const API_URL = 'http://localhost:3002/journalist';

export const createJournalist = async (
  journalistData: JournalistRequest
): Promise<JournalistResponse> => {
  try {
    console.log("Enviando datos del periodista:", journalistData);

    const response = await axios.post<JournalistResponse>(API_URL, journalistData);

    console.log("Respuesta del backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al crear el periodista:", error);
    throw new Error("No se pudo crear el periodista");
  }
};
