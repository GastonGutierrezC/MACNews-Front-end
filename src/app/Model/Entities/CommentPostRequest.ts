export interface CommentPostRequest {
  UserID: string;
  ChannelID: string;
  TextComment: string;
  ParentComment?: string; // Opcional, si es subcomentario
}
