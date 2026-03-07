// src/app/Model/Services/getUserProfile.ts

import axios from 'axios';
import { UserProfile } from '../Entities/UserProfile';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.USER_PROFILE;

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  try {
    const response = await axios.get<UserProfile>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('[getUserProfile] Error al obtener perfil del usuario:', error.message);
    throw error;
  }
};
