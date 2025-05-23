export interface User {
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
 
}

export interface Password {
  PasswordUser: string;
}

export interface UserRegistration {
  user: User;
  password: Password;
}
