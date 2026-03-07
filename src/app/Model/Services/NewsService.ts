

import axios from "axios";
import { News, NewsResponse } from "../Entities/NewsCreation";
import { ENDPOINTS } from "@/app/Utils/EnpointsBackEnd/enpoints";

export const NewsService = {
  async submitNews(newsData: News): Promise<NewsResponse | true> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. El usuario no está autenticado.');
      }

      const response = await axios.post<NewsResponse>(
        ENDPOINTS.CREATE_NEWS,
        newsData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true; // éxito
    } catch (error: any) {
      if (error.response) {
        console.error("Error del backend:", error.response.data);
        return error.response.data;
      }
      throw new Error("Error de red o de configuración");
    }
  },
};
