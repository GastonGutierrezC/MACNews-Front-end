// src/app/Model/Services/UserService.ts

import axios from 'axios';
import { UserUpdate } from '../Entities/UserUpdate';

const API_URL = 'http://localhost:3002/users';

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
