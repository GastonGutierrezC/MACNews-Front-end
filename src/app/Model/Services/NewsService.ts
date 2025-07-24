

import axios from "axios";
import { News, NewsResponse } from "../Entities/NewsCreation";

export const NewsService = {
  async submitNews(newsData: News): Promise<NewsResponse | true> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. El usuario no está autenticado.');
      }

      const response = await axios.post<NewsResponse>(
        "http://localhost:3002/news",
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
