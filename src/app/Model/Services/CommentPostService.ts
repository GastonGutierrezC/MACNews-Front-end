// src/Model/Services/CommentPostService.ts
// src/Model/Services/CommentPostService.ts

import axios from 'axios'
import { CommentPostResponse } from '../Entities/CommentPost'
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints'

const BASE_URL = ENDPOINTS.GET_COMMENTS_POST

export const getCommentsByChannel = async (
  channelId: string,
  page: number = 1,
  limit: number = 10
): Promise<CommentPostResponse> => {
  try {
    const response = await axios.get<CommentPostResponse>(
      `${BASE_URL}/${encodeURIComponent(channelId)}?page=${page}&limit=${limit}`
    )
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(
        `[getCommentsByChannel] No se encontraron comentarios para el canal "${channelId}"`
      )
      return {
        Comments: [],
        ChannelID: "null"
      }
    }

    console.error(
      `[getCommentsByChannel] Error al obtener comentarios del canal:`,
      error.message
    )
    throw new Error('No se pudieron obtener los comentarios del canal')
  }
}
