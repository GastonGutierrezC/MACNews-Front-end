// src/app/Model/Services/GetChannelByNameAndCreatorService.ts

import axios from 'axios';
import { ChannelDetail } from '../Entities/ChannelDetailEntity';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

export const getChannelByNameAndCreator = async (
  channelName: string,
  creatorFullName: string
): Promise<ChannelDetail | null> => {
  try {
    const response = await axios.get(ENDPOINTS.GET_CHANNEL_BY_NAME_AND_CREATOR, {
      params: {
        channelName,
        creatorFullName,
      },
    });

    return response.data as ChannelDetail;
  } catch (error) {
    console.error('[GetChannelByNameAndCreatorService] Error al obtener el canal:', error);
    return null;
  }
};
