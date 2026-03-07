import axios from 'axios';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.CHANGE_USER_ROLE; // Ej: 'http://localhost:5249/api/users/changeRole/'

export const changeUserRole = async (userId: string, roleAssigned: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.patch(
      `${API_URL}${userId}`,
      { roleAssigned },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Retornamos true si el status es 200
    return response.status === 200;
  } catch (error) {
    console.error("Error al cambiar el rol del usuario:", error);
    throw new Error("No se pudo cambiar el rol del usuario");
  }
};
