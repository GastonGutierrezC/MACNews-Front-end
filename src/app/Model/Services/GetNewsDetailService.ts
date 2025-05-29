import axios from 'axios';
import { NewsDetail } from '@/app/Model/Entities/NewsDetail';

export const getNewsDetail = async (title: string, date: string): Promise<NewsDetail> => {
  const encodedTitle = encodeURIComponent(title);
  const encodedDate = encodeURIComponent(date);
  
  const url = `http://localhost:3002/news/title/${encodedTitle}/date/${encodedDate}`;
  const response = await axios.get<NewsDetail>(url);
  return response.data;
};



// http://localhost:3002/news//news/title/{title}/date/{date}