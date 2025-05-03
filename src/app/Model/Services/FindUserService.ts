// services/userService.ts
import axios from 'axios';
import { User } from '../Entities/FindUser';

export const findUserByCredentials = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.get<User>('http://localhost:3002/users/findByCredentials', {
      params: { email, password },
    });
    return response.data;
  } catch (error: any) {

    throw error.response?.data || { message: 'Unknown error' };
  }
};

