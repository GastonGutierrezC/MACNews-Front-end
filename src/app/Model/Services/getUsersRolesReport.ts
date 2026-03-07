// Model/Services/Reports/getUsersRolesReport.ts

import axios from "axios";
import { ENDPOINTS } from "@/app/Utils/EnpointsBackEnd/enpoints";
import { UsersRolesReport } from "../Entities/UsersRolesReport";

export const getUsersRolesReport = async (): Promise<UsersRolesReport> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.get<UsersRolesReport>(
      ENDPOINTS.USERS_ROLES_REPORT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[getUsersRolesReport] Error:", error);
    throw error;
  }
};
