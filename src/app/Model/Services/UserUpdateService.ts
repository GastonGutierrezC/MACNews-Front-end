// src/app/Model/Services/UserService.ts

import axios from 'axios';
import { UserUpdate } from '../Entities/UserUpdate';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.UPDATE_USER;

export const updateUser = async (userData: UserUpdate): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    const response = await axios.patch(API_URL, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("Actualizando usuario:", userData);
    console.log("Respuesta del backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
};
