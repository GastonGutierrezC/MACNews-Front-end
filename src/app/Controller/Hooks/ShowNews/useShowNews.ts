// app/Controller/Hooks/ShowNews/useShowNews.ts
import { useNews } from '@/app/Controller/Hooks/User/useNews';
import { useTopNews } from '@/app/Controller/Hooks/ShowNews/useTopNews';
import { useRecommendationsNews } from '@/app/Controller/Hooks/ShowNews/useRecommendationsNews';
import { useUser } from '@/app/Controller/Context/UserContext';

export const useShowNews = () => {
  const { user } = useUser();

  const {
    news: defaultNews,
    loadingInitial,
    loadingMore,
    error,
    loadMore
  } = useNews();

  const {
    news: recommendedNews,
    loading: loadingRecommended,
    error: errorRecommended
  } = useRecommendationsNews(user?.id);

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop
  } = useTopNews();

  const newsToShow = user?.id && recommendedNews.length > 0
    ? recommendedNews
    : defaultNews;

  const isLoading = loadingInitial || loadingTop || (user?.id && loadingRecommended);
  const hasError = error || errorTop || (user?.id && errorRecommended);

  return {
    user,
    newsToShow,
    topNews,
    isLoading,
    hasError,
    loadMore
  };
};
