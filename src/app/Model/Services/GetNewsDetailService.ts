import axios from 'axios';
import { NewsDetail } from '@/app/Model/Entities/NewsDetail';

export const getNewsDetail = async (id: string): Promise<NewsDetail> => {
  const response = await axios.get<NewsDetail>(`http://localhost:3002/news/${id}`);
  return response.data;
};
