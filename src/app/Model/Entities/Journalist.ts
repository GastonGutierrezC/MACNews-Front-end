// src/Entities/Journalist.ts

export interface JournalistRequest {
    UserID: string;
    Specialty: string;
    JournalisticExperience: string;
  }
  
  export interface User {
    UserID: string;
    UserFirstName: string;
    UserLastName: string;
    UserEmail: string;
    UserImageURL: string;
    IsActive: boolean;
    RegistrationDate: string;
  }
  
  export interface JournalistResponse {
    JournalistID: string;
    Specialty: string;
    JournalisticExperience: string;
    IsActive: boolean;
    DateCreated: string;
    User: User;
  }
  