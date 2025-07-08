import { NewsUpdateRequest, NewsUpdateResponse } from '@/app/Model/Entities/NewsUpdateRequest';
import { updateNewsByAgent } from '@/app/Model/Services/UpdateNewsByAgentService';
import { useState } from 'react';

export const useUpdateNewsByAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedNews, setUpdatedNews] = useState<string | null>(null);

  const updateNews = async (data: NewsUpdateRequest): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setUpdatedNews(null);

    try {
      const response: NewsUpdateResponse = await updateNewsByAgent(data);
      setUpdatedNews(response.newNews);
      return response.newNews; // RETORNAMOS el nuevo contenido
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al actualizar la noticia.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateNews,
    loading,
    error,
    updatedNews,
  };
};
