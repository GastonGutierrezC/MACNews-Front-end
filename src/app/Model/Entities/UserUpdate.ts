export interface UserUpdate {
    user: {
      UserFirstName: string;
      UserLastName: string;
      UserEmail: string;
      UserImageURL: string;
    };
    password: {
      PasswordUser: string;
    };
  }
  