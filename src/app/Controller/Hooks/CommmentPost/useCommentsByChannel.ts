import { useEffect, useState } from 'react';
import { getCommentsByChannel } from '@/app/Model/Services/CommentPostService';
import { CommentPostResponse } from '@/app/Model/Entities/CommentPost';

export const useCommentsByChannel = (channelId: string) => {
  const [comments, setComments] = useState<CommentPostResponse | null>(null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true); // <--- nuevo estado
  const limit = 10;

  const fetchComments = async (pageToLoad: number) => {
    const isFirstPage = pageToLoad === 1;
    if (isFirstPage) setLoadingInitial(true);
    else setLoadingMore(true);

    setError(null);

    try {
      if (!channelId) throw new Error('El ID del canal es requerido');

      const data = await getCommentsByChannel(channelId, pageToLoad, limit);

      if (!data) throw new Error('No se encontraron comentarios para este canal');

      if (isFirstPage) {
        setComments(data);
      } else {
        setComments(prev => {
          if (!prev) return data;
          return {
            ...data,
            comments: [...prev.Comments, ...data.Comments],
          };
        });
      }

      // 👉 Aquí determinamos si hay más comentarios o no
      if (data.Comments.length < limit) {
        setCanLoadMore(false);
      } else {
        setCanLoadMore(true);
      }

    } catch (err: any) {
      console.error('[useCommentsByChannel] Error:', err);
      setError(err.message || 'Error al obtener los comentarios');
    } finally {
      if (isFirstPage) setLoadingInitial(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setCanLoadMore(true);
    fetchComments(1);
  }, [channelId]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  return {
    comments,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
    page,
    limit,
    canLoadMore, // <- ¡EXPORTAMOS esto!
  };
};
