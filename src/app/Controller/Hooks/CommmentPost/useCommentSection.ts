'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useCommentsByChannel } from '@/app/Controller/Hooks/CommmentPost/useCommentsByChannel'
import { usePostComment } from '@/app/Controller/Hooks/CommmentPost/usePostComment'
import { Comment, Subcomment } from '@/app/Model/Entities/CommentPost'
import { useUserProfile } from '@/app/Controller/Hooks/User/useUserProfile'
import { toast } from 'sonner' // <-- Sonner import

export interface CommentsListProps {
  channelId: string
  userId: string | null
}

export const useCommentsLogic = ({ channelId }: CommentsListProps) => {
  const {
    comments,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
    canLoadMore,
  } = useCommentsByChannel(channelId)

  const { sendComment, loading: sending } = usePostComment()

  const [textComment, setTextComment] = useState('')
  const [textSubcomment, setTextSubcomment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [localComments, setLocalComments] = useState<Comment[]>([])

  const { profile: user } = useUserProfile()

  // Sincroniza comentarios del backend con los locales
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

  // Crear comentario principal
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!textComment.trim()) return

    if (!user) {
      toast.error("Debes registrarte para poder escribir un comentario.")
      return
    }

    try {
      const createdComment: Comment = await sendComment({
        ChannelID: channelId,
        TextComment: textComment.trim(),
      })

      setLocalComments((prev) => [createdComment, ...prev])
      setTextComment('')
      toast.success("Comentario publicado con éxito")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error enviando comentario")
    }
  }

  // Crear subcomentario
  const handleSubmitSubcomment = (parentId: string) => async (e: FormEvent) => {
    e.preventDefault()
    if (!textSubcomment.trim()) return

    if (!user) {
      toast.error("Debes registrarte para poder escribir un comentario.")
      return
    }

    try {
      const createdSubcomment: Subcomment = await sendComment({
        ChannelID: channelId,
        TextComment: textSubcomment.trim(),
        ParentComment: parentId,
      })

      setLocalComments((prev) =>
        prev.map((comment) =>
          comment.CommentPostID === parentId
            ? { ...comment, Subcomments: [...(comment.Subcomments ?? []), createdSubcomment] }
            : comment
        )
      )

      setTextSubcomment('')
      setReplyingTo(null)
      toast.success("Respuesta publicada con éxito")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error enviando subcomentario")
    }
  }

  return {
    localComments,
    loadingInitial,
    loadingMore,
    error,
    sending,
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

