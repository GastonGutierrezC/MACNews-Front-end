// src/Model/Entities/CommentPost.ts

export interface Subcomment {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;
}

export interface Comment {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;
  Subcomments?: Subcomment[];
}

export interface CommentPostResponse {
  ChannelID: string;
  Comments: Comment[];
}
