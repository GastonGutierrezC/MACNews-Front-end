'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useCommentsByChannel } from '@/app/Controller/Hooks/CommmentPost/useCommentsByChannel'
import { usePostComment } from '@/app/Controller/Hooks/CommmentPost/usePostComment'
import { Comment, Subcomment } from '@/app/Model/Entities/CommentPost'
import { useUser } from '../../Context/UserContext'

export interface CommentsListProps {
  channelId: string
  userId: string | null
}

export const useCommentsLogic = ({ channelId, userId }: CommentsListProps) => {
  const { 
    comments, 
    loadingInitial, 
    loadingMore, 
    error, 
    loadMore, 
    canLoadMore,
    page, 
    limit 
  } = useCommentsByChannel(channelId)

  const { sendComment, loading: sending, error: sendError } = usePostComment()

  const [textComment, setTextComment] = useState('')
  const [textSubcomment, setTextSubcomment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [localComments, setLocalComments] = useState<Comment[]>([])
  const { user } = useUser()

  // Acumula comentarios nuevos sin reemplazar los anteriores
  useEffect(() => {
    if (comments?.Comments) {
      setLocalComments((prev) => {
        const newComments = comments.Comments.filter(
          (newC) => !prev.some((prevC) => prevC.CommentPostID === newC.CommentPostID)
        )
        return [...prev, ...newComments]
      })
    }
  }, [comments])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!textComment.trim()) return

    if (!userId) {
      alert('Debes registrarte para poder escribir un comentario.')
      return
    }

    try {
      const createdComment: Comment = await sendComment({
        UserID: userId,
        ChannelID: channelId,
        TextComment: textComment.trim(),
      })

      setLocalComments((prev) => [createdComment, ...prev])
      setTextComment('')
    } catch (error) {
      console.error('Error enviando comentario:', error)
    }
  }

  const handleSubmitSubcomment = (parentId: string) => async (e: FormEvent) => {
    e.preventDefault()
    if (!textSubcomment.trim()) return

    if (!userId) {
      alert('Debes registrarte para poder escribir un comentario.')
      return
    }

    try {
      const createdSubcomment: Subcomment = await sendComment({
        UserID: userId,
        ChannelID: channelId,
        TextComment: textSubcomment.trim(),
        ParentComment: parentId,
      })

      setLocalComments((prev) =>
        prev.map((comment) =>
          comment.CommentPostID === parentId
            ? {
                ...comment,
                Subcomments: [...(comment.Subcomments ?? []), createdSubcomment],
              }
            : comment
        )
      )

      setTextSubcomment('')
      setReplyingTo(null)
    } catch (error) {
      console.error('Error enviando subcomentario:', error)
    }
  }

  // Mostrar el botón "Ver más" solo si la cantidad de comentarios actuales es igual al límite, 
  // asumiendo que si fuera menos no hay más para cargar


  return {
    localComments,
    loadingInitial,
    loadingMore,
    error,
    sending,
    sendError,
    textComment,
    setTextComment,
    textSubcomment,
    setTextSubcomment,
    replyingTo,
    setReplyingTo,
    handleSubmit,
    handleSubmitSubcomment,
    userImageUrl: user?.UserImageURL || null,
    loadMore,
    canLoadMore,
  }
}
