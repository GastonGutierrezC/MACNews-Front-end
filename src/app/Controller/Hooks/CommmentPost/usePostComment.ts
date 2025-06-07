import { useState } from 'react';
import { postComment } from '@/app/Model/Services/PostCommentService';
import { CommentPostRequest } from '@/app/Model/Entities/CommentPostRequest';
import { Comment } from '@/app/Model/Entities/CommentPost';

export const usePostComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const sendComment = async (commentData: CommentPostRequest): Promise<Comment> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await postComment(commentData); // Debe devolver un objeto tipo Comment
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message || 'Error al enviar el comentario');
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendComment, loading, error, success };
};
