// services/userService.ts
import axios from 'axios';
import { RawUserFromBackend } from '../Entities/RawUserFromBackend';


export const findUserByCredentials = async (
  email: string,
  password: string
): Promise<RawUserFromBackend> => {
  try {
    const response = await axios.get<RawUserFromBackend>(
      'http://localhost:3002/users/findByCredentials',
      {
        params: { email, password },
      }
    );
    console.log('[findUserByCredentials] Response data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[findUserByCredentials] Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Unknown error' };
  }
};



// http://localhost:3002/followChannels/user/{userId}

