import axios from "axios";
import { ENDPOINTS } from "@/app/Utils/EnpointsBackEnd/enpoints";
import { NewsReviewReport } from "../Entities/NewsReviewReport";

export const getNewsReviewReport = async (
  startDate: string,
  endDate: string
): Promise<NewsReviewReport> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.get<NewsReviewReport>(
      ENDPOINTS.NEWS_REVIEW_REPORT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate,
          endDate,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[getNewsReviewReport] Error:", error);
    throw error;
  }
};
