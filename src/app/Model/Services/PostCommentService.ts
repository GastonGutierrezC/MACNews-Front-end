import axios from 'axios';
import { CommentPostRequest } from '../Entities/CommentPostRequest';

const API_URL = 'http://localhost:3002/comment-post';

export const postComment = async (commentData: CommentPostRequest): Promise<boolean> => {
  try {
    const response = await axios.post<boolean>(API_URL, commentData);
    return response.data;  // Espera un true si fue exitoso
  } catch (error) {
    console.error('Error al enviar comentario:', error);
    throw error;
  }
};
