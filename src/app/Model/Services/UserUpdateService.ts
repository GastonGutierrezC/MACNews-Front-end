// src/app/Model/Services/UserService.ts

import axios from 'axios';
import { UserUpdate } from '../Entities/UserUpdate';

const API_URL = 'http://localhost:3002/users';

export const updateUser = async (userId: string, userData: UserUpdate): Promise<any> => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}`, userData);
    console.log("Actualizando usuario:", userData);
    console.log("Respuesta del backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
};
