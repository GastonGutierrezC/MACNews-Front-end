// hooks/useSubmitNews.ts

import { NewsResponse, News } from "@/app/Model/Entities/NewsCreation";
import { NewsService } from "@/app/Model/Services/NewsService";
import { useState } from "react";

export const useSubmitNews = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitNews = async (news: News) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await NewsService.submitNews(news);

      if (result === true) {
        setResponse(true);
      } else if (result.violations) {
        setResponse(result);
      } else {
        setError("Ocurrió un error desconocido al enviar la noticia.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error inesperado al enviar la noticia.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    submitNews,
  };
};
