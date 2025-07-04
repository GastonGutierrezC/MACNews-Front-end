// src/Model/Services/ChannelMetricsService.ts
import axios from 'axios';
import { ChannelMetric } from '../Entities/ChannelMetric';

const API_URL = 'http://localhost:3002/channel-metrics/channel';

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
