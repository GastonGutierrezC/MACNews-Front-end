// src/Model/Services/ChannelService.ts

import axios from 'axios';
import { ChannelRequest, ChannelResponse } from '../Entities/Channel';

const API_URL = 'http://localhost:3002/channels';

export const createChannel = async (
  channelData: ChannelRequest
): Promise<ChannelResponse> => {
  try {
    console.log("Enviando datos del canal:", channelData);

    const response = await axios.post<ChannelResponse>(API_URL, channelData);

    console.log("Respuesta del backend (Channel):", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al crear el canal:", error);
    throw new Error("No se pudo crear el canal");
  }
};
