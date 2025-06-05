export interface User {
  id?: string;               // Opcional, para cuando se tenga el ID
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  JournalistID?: string;     // Opcional, si aplica para usuarios periodistas
}

export interface Password {
  PasswordUser: string;
}

export interface UserRegistration {
  user: User;
  password: Password;
}
