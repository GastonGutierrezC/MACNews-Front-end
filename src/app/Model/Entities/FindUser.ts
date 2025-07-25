export interface User {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
  RoleAssigned: string;
  JournalistID?: string; // Opcional, porque no todos serán periodistas
}

// JournalistID