// Model/Entities/UsersPendingApplicationReport.ts

export interface UsersPendingApplicationReport {
  userId: string;
  aplicationId: string;
  fullName: string;
  email: string;
  birthDate: string; // formato YYYY-MM-DD
  cardNumber: string;
  reason: string;
  imageCertificateURL: string;
  verificationStatus: "Rejected" | "Checking" | "Approved";
  applicationDate: string; // formato ISO
}
