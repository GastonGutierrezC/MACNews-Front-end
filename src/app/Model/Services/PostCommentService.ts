import axios from 'axios';
import { CommentPostRequest } from '../Entities/CommentPostRequest';
import { Comment } from '../Entities/CommentPost';

const API_URL = 'http://localhost:3002/comment-post';

export const postComment = async (commentData: CommentPostRequest): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(API_URL, commentData);
    return response.data;  // Aquí retornamos el Comment creado
  } catch (error) {
    console.error('Error al enviar comentario:', error);
    throw error;
  }
};
