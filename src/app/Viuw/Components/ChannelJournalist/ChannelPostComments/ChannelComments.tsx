'use client'

import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CommentsListProps,useCommentsLogic } from '@/app/Controller/Hooks/CommmentPost/useCommentSection'

export const CommentsList: React.FC<CommentsListProps> = (props) => {
  const {
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
    userImageUrl,
    canLoadMore,
    loadMore,
  } = useCommentsLogic(props)

  const { userId } = props
  const [visibleSubcomments, setVisibleSubcomments] = useState<Record<string, boolean>>({})

  const toggleSubcomments = (commentId: string) => {
    setVisibleSubcomments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  if (loadingInitial) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {userId ? (
        <form onSubmit={handleSubmit} className="mb-8 flex space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userImageUrl || ''} alt="@user" />
            <AvatarFallback>{userId.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-grow">
            <Textarea
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
              placeholder="Añade un comentario público..."
              className="resize-none"
              rows={3}
              disabled={sending}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <Button variant="bluehover" disabled={sending || !textComment.trim()}>
                {sending ? 'Enviando...' : 'Comentar'}
              </Button>
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
        <div className="text-center text-muted-foreground">No hay comentarios para este canal.</div>
      ) : (
        <>
          {localComments.map((comment) => {
            const subcomments = comment.Subcomments ?? []
            const isVisible = visibleSubcomments[comment.CommentPostID]

            return (
              <div key={comment.CommentPostID} className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.UserImageURL || ''} alt="@user" />
                  <AvatarFallback>{comment.UserFullName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>

                <div className="flex-grow">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold">{comment.UserFullName}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.DateComment).toLocaleString()}
                        </span>
                      </div>

                      <p className="whitespace-pre-line">{comment.TextComment}</p>

                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          variant="link"
                          className="text-sm px-0"
                          onClick={() =>
                            setReplyingTo(replyingTo === comment.CommentPostID ? null : comment.CommentPostID)
                          }
                        >
                          {replyingTo === comment.CommentPostID ? 'Cancelar' : 'Responder'}
                        </Button>

                        {subcomments.length > 0 && (
                          <Button
                            variant="link"
                            className="text-sm px-0"
                            onClick={() => toggleSubcomments(comment.CommentPostID)}
                          >
                            {isVisible ? 'Ocultar respuestas' : `Mostrar respuestas (${subcomments.length})`}
                          </Button>
                        )}
                      </div>

                      {replyingTo === comment.CommentPostID && (
                        <form onSubmit={handleSubmitSubcomment(comment.CommentPostID)} className="mt-3">
                          <Textarea
                            value={textSubcomment}
                            onChange={(e) => setTextSubcomment(e.target.value)}
                            placeholder="Añade una respuesta..."
                            className="resize-none"
                            rows={2}
                            disabled={sending}
                          />
                          <div className="flex justify-end mt-1">
                            <Button variant="bluehover" size="sm" disabled={sending || !textSubcomment.trim()}>
                              {sending ? 'Enviando...' : 'Responder'}
                            </Button>
                          </div>
                        </form>
                      )}

                      {isVisible && subcomments.length > 0 && (
                        <div className="mt-4 ml-12 border-l pl-4 space-y-4">
                          {subcomments.map((sub) => (
                            <div key={sub.CommentPostID} className="flex space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={sub.UserImageURL || ''} alt="@sub-user" />
                                <AvatarFallback>{sub.UserFullName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                              </Avatar>

                              <Card className="flex-grow">
                                <CardContent className="p-3 text-sm text-muted-foreground">
                                  <div className="flex justify-between mb-1">
                                    <h5 className="font-semibold text-sm text-primary">{sub.UserFullName}</h5>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(sub.DateComment).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="whitespace-pre-line">{sub.TextComment}</p>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}

          {(loadingMore || canLoadMore) && (
            <div className="flex justify-center mt-6">
              <Button type="button" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Cargando...' : 'Ver más comentarios'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
