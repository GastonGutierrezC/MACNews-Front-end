// src/Model/Services/CommentPostService.ts

import axios from 'axios';
import { CommentPostResponse } from '../Entities/CommentPost';

const API_URL = 'http://localhost:3002/comment-post/channel';

export const getCommentsByChannel = async (
  channelId: string
): Promise<CommentPostResponse> => {
  try {
    const response = await axios.get<CommentPostResponse>(`${API_URL}/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios del canal:', error);
    throw error;
  }
};
