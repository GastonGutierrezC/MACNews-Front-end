import axios from 'axios';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.UNFOLLOW_CHANNEL; 
// Ejemplo esperado: "https://tu-api.com/followChannels"

export const unfollowChannel = async (channelId: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.delete<boolean>(`${API_URL}/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[unfollowChannel] Respuesta del backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("[unfollowChannel] Error al desuscribirse del canal:", error);
    throw new Error("No se pudo desuscribirse del canal");
  }
};
