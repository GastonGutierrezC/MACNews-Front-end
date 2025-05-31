// src/app/Model/Services/GetChannelByNameAndCreatorService.ts

import axios from 'axios';
import { ChannelDetail } from '../Entities/ChannelDetailEntity';

const BASE_URL = 'http://localhost:3002/channels';

export const getChannelByNameAndCreator = async (
  channelName: string,
  creatorFullName: string
): Promise<ChannelDetail | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/by-channel-name-and-creator`, {
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
