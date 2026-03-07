// services/userService.ts
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

export const loginAndGetToken = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      ENDPOINTS.USER_LOGIN,
      {
        UserEmail: email,
        PasswordUser: password, 
      }
    );

    console.log('[loginAndGetToken] Token:', response.data.token);

    // Podés guardar el token si querés:
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: any) {
    console.error('[loginAndGetToken] Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Unknown error' };
  }
};



// http://localhost:3002/users/profile

