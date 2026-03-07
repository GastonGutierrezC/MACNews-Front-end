import axios from 'axios';
import { ChannelRequest, ChannelResponse } from '../Entities/Channel';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.CREATE_CHANNEL;

export const createChannel = async (
  channelData: ChannelRequest
): Promise<ChannelResponse> => {
  try {
    console.log("Enviando datos del canal:", channelData);

    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.post<ChannelResponse>(API_URL, channelData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta del backend (Channel):", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al crear el canal:", error);
    throw new Error("No se pudo crear el canal");
  }
};
