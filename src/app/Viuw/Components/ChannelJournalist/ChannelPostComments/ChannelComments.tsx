'use client';

import React, { useState, useEffect } from 'react';

import { Comment, Subcomment } from '@/app/Model/Entities/CommentPost';
import { useCommentsByChannel } from '@/app/Controller/Hooks/CommmentPost/useCommentsByChannel';
import { usePostComment } from '@/app/Controller/Hooks/CommmentPost/usePostComment';

interface CommentsListProps {
  channelId: string;
  userId: string | null;
}

export const CommentsList: React.FC<CommentsListProps> = ({ channelId, userId }) => {
  const { comments, loading, error } = useCommentsByChannel(channelId);
  const { sendComment, loading: sending, error: sendError } = usePostComment();

  const [textComment, setTextComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [textSubcomment, setTextSubcomment] = useState('');

  useEffect(() => {
    if (comments?.Comments) {
      setLocalComments(comments.Comments);
    }
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textComment.trim()) return;

    if (!userId) {
      alert('Debes registrarte para poder escribir un comentario.');
      return;
    }

    try {
      await sendComment({
        UserID: userId,
        ChannelID: channelId,
        TextComment: textComment.trim(),
      });

      const newComment: Comment = {
        CommentPostID: `temp-${Date.now()}`,
        TextComment: textComment.trim(),
        DateComment: new Date().toISOString(),
        Subcomments: [],
      };

      setLocalComments([newComment, ...localComments]);
      setTextComment('');
    } catch {
      // error manejado en el hook
    }
  };

  const handleSubmitSubcomment = (parentId: string) => async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textSubcomment.trim()) return;

    if (!userId) {
      alert('Debes registrarte para poder escribir un comentario.');
      return;
    }

    try {
      await sendComment({
        UserID: userId,
        ChannelID: channelId,
        TextComment: textSubcomment.trim(),
        ParentComment: parentId,
      });

      const newSubcomment: Subcomment = {
        CommentPostID: `temp-sub-${Date.now()}`,
        TextComment: textSubcomment.trim(),
        DateComment: new Date().toISOString(),
      };

      setLocalComments((prev) =>
        prev.map((comment) =>
          comment.CommentPostID === parentId
            ? { ...comment, Subcomments: [...(comment.Subcomments ?? []), newSubcomment] }
            : comment
        )
      );

      setTextSubcomment('');
      setReplyingTo(null);
    } catch {
      // manejar error si quieres
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 rounded-md bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {userId ? (
        <form onSubmit={handleSubmit} className="mb-8 flex space-x-4">
          {/* Foto perfil placeholder */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {userId.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex-grow">
            <textarea
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
              placeholder="Añade un comentario público..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows={3}
              disabled={sending}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                type="submit"
                disabled={sending || !textComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? 'Enviando...' : 'Comentar'}
              </button>
            </div>
            {sendError && <p className="text-red-500 mt-1">{sendError}</p>}
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 max-w-3xl mx-auto">
          Para poder escribir un comentario debes estar registrado y haber iniciado sesión.
        </div>
      )}

      {localComments.length === 0 ? (
        <div className="text-center text-gray-500">No hay comentarios para este canal.</div>
      ) : (
        localComments.map((comment) => {
          const subcomments = comment.Subcomments ?? [];

          return (
            <div key={comment.CommentPostID} className="flex space-x-4">
              {/* Foto perfil placeholder para comentario */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {comment.CommentPostID.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-grow">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">Usuario Anónimo</h4>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.DateComment).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-800 whitespace-pre-line">{comment.TextComment}</p>

                  <button
                    className="text-sm text-blue-600 hover:underline mt-2"
                    onClick={() =>
                      setReplyingTo(replyingTo === comment.CommentPostID ? null : comment.CommentPostID)
                    }
                  >
                    {replyingTo === comment.CommentPostID ? 'Cancelar' : 'Responder'}
                  </button>

                  {replyingTo === comment.CommentPostID && (
                    <form onSubmit={handleSubmitSubcomment(comment.CommentPostID)} className="mt-3">
                      <textarea
                        value={textSubcomment}
                        onChange={(e) => setTextSubcomment(e.target.value)}
                        placeholder="Añade una respuesta..."
                        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                        rows={2}
                        disabled={sending}
                      />
                      <div className="flex justify-end mt-1">
                        <button
                          type="submit"
                          disabled={sending || !textSubcomment.trim()}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {sending ? 'Enviando...' : 'Responder'}
                        </button>
                      </div>
                    </form>
                  )}

                  {subcomments.length > 0 && (
                    <div className="mt-4 ml-12 border-l-2 border-gray-300 pl-4 space-y-4">
                      {subcomments.map((sub) => (
                        <div key={sub.CommentPostID} className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow">
                          <div className="flex justify-between mb-1">
                            <h5 className="font-semibold text-gray-900">Usuario Anónimo</h5>
                            <span className="text-xs text-gray-400">
                              {new Date(sub.DateComment).toLocaleString()}
                            </span>
                          </div>
                          <p className="whitespace-pre-line">{sub.TextComment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
