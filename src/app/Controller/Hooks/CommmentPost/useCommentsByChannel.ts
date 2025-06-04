import { useEffect, useState } from 'react';
import { getCommentsByChannel } from '@/app/Model/Services/CommentPostService';
import { CommentPostResponse } from '@/app/Model/Entities/CommentPost';

export const useCommentsByChannel = (channelId: string) => {
  const [comments, setComments] = useState<CommentPostResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!channelId) {
          throw new Error('El ID del canal es requerido');
        }

        const data = await getCommentsByChannel(channelId);
        if (!data) {
          throw new Error('No se encontraron comentarios para este canal');
        }

        setComments(data);
      } catch (err: any) {
        console.error('[useCommentsByChannel] Error:', err);
        setError(err.message || 'Error al obtener los comentarios');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [channelId]);

  return { comments, loading, error };
};
