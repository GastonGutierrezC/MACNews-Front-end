import axios from 'axios';
import { CommentPostRequest } from '../Entities/CommentPostRequest';
import { Comment } from '../Entities/CommentPost';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.CREATE_COMMENT;

export const postComment = async (commentData: CommentPostRequest): Promise<Comment> => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post<Comment>(API_URL, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar comentario:', error);
    throw error;
  }
};
