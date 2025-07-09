import { useNews } from '@/app/Controller/Hooks/ShowNews/useNews';
import { useTopNews } from '@/app/Controller/Hooks/ShowNews/useTopNews';
import { useRecommendationsNews } from '@/app/Controller/Hooks/ShowNews/useRecommendationsNews';
import { useToken } from '../../Context/UserContext';


export const useShowNews = () => {
  const { token } = useToken();

  const {
    news: defaultNews,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
  } = useNews();

  const {
    news: recommendedNews,
    loading: loadingRecommended,
    error: errorRecommended,
  } = useRecommendationsNews();

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop,
  } = useTopNews();

    const isAuthenticated = !!token; // ✅ Nuevo flag claro

  // Si hay token y noticias recomendadas, mostrar recomendaciones; si no, noticias por defecto
  const newsToShow = isAuthenticated && recommendedNews.length > 0
    ? recommendedNews
    : defaultNews;

  // Si hay token y noticias recomendadas, mostrar recomendaciones; si no, noticias por defecto

  const isLoading = loadingInitial || loadingTop || (token ? loadingRecommended : false);
  const hasError = error || errorTop || (token ? errorRecommended : null);

  return {
    newsToShow,
    topNews,
    recommendedNews,
    isLoading,
    hasError,
    loadMore,
    isAuthenticated
  };
};
