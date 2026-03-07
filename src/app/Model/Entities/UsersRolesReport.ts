// Entities/Reports/UsersRolesReport.ts

export interface UserBasicInfo {
  fullName: string;
  email: string;
}

export interface UsersRolesReport {
  totalUsers: number;
  readers: number;
  journalists: number;
  administrators: number;
  readerList: UserBasicInfo[];
  journalistList: UserBasicInfo[];
  administratorList: UserBasicInfo[];
}
