import axios from 'axios';
import { UserRegistration } from '../Entities/User';


const API_URL = 'http://localhost:3002/users';

export const createUser = async (userData: UserRegistration): Promise<any> => {
  try {
    const response = await axios.post(API_URL, userData);
    console.log("Registrando usuario:", userData);
    console.log("Respuesta del backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("No se pudo crear el usuario");
  }
};

// http://localhost:3002/searchHistory
// http://localhost:3002/news/category/{category}

