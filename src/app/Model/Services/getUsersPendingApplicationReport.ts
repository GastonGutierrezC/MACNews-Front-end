// Model/Services/Reports/getUsersPendingApplicationReport.ts

import axios from "axios";
import { ENDPOINTS } from "@/app/Utils/EnpointsBackEnd/enpoints";
import { UsersPendingApplicationReport } from "../Entities/UsersPendingApplicationReport";

export const getUsersPendingApplicationReport = async (): Promise<UsersPendingApplicationReport[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.get<UsersPendingApplicationReport[]>(
      ENDPOINTS.USERS_PENDING_APPLICATION_REPORT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[getUsersPendingApplicationReport] Error:", error);
    throw error;
  }
};
