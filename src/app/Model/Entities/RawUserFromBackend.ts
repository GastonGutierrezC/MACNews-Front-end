export interface RawUserFromBackend {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
  RoleAssigned: string;
  JournalistID?: string;
}
