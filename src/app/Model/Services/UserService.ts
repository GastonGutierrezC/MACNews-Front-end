// src/app/Model/Services/createUser.ts

import axios from 'axios';
import { UserRegistration } from '../Entities/User';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.CREATE_USER;

export const createUser = async (userData: UserRegistration): Promise<string> => {
  try {
    const response = await axios.post(API_URL, userData);
    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      console.log('[createUser] Token recibido y guardado:', token);
    } else {
      console.warn('[createUser] Registro exitoso, pero no se recibió token');
    }

    return token;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw new Error('No se pudo crear el usuario');
  }
};


// http://localhost:3002/auth/register
// http://localhost:3002/news/category/{category}

