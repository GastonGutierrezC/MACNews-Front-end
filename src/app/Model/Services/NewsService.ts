// services/NewsService.ts
// services/NewsService.ts

import axios from "axios";
import { News, NewsResponse } from "../Entities/NewsCreation";

export const NewsService = {
  async submitNews(newsData: News): Promise<NewsResponse | true> {
    try {
      const response = await axios.post<NewsResponse>(
        "http://localhost:3002/news",
        newsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true; // éxito
    } catch (error: any) {
      if (error.response) {
        console.error("Error del backend:", error.response.data);
        // Devolvemos el mensaje y violaciones del backend
        return error.response.data;
      }
      throw new Error("Error de red o de configuración");
    }
  },
};
