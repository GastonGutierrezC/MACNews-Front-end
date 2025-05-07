// src/Entities/ApplicationFormEvaluation.ts

export interface ApplicationFormEvaluation {
    UserID: string;
    BirthDate: string; // ISO format: "YYYY-MM-DD"
    CardNumber: string;
    Reason: string;
    ImageCertificateURL: string;
  }
  