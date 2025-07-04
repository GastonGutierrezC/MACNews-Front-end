export interface CommentPostRequest {
  ChannelID: string;
  TextComment: string;
  ParentComment?: string; // Opcional, si es subcomentario
}
