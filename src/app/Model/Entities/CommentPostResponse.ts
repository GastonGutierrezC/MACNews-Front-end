export interface CommentPostResponse {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;      // ISO string
  UserFullName: string;
  UserImageURL: string;
  Subcomments: Subcomment[];  // O un array vacío
}

export interface Subcomment {
  CommentPostID: string;
  TextComment: string;
  DateComment: string;
  UserFullName: string;
  UserImageURL: string;
}
