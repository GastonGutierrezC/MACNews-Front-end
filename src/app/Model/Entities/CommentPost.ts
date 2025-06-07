// src/Model/Entities/CommentPost.ts

export interface Subcomment {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;
  UserFullName: string;
  UserImageURL: string;
}

export interface Comment {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;
  UserFullName: string;
  UserImageURL: string;
  Subcomments?: Subcomment[];
}

export interface CommentPostResponse {
  ChannelID: string;
  Comments: Comment[];
}
