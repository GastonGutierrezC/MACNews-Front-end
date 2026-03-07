// src/Model/Services/ChannelMetricsService.ts
import axios from 'axios';
import { ChannelMetric } from '../Entities/ChannelMetric';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.GET_CHANNEL_METRICS;

export const getChannelMetrics = async (
  channelId: string
): Promise<ChannelMetric[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible para autenticación.');
    }

    const response = await axios.get<ChannelMetric[]>(`${API_URL}/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener métricas del canal:', error);
    throw error;
  }
};
