import axios from 'axios';
import { UserRegistration } from '../Entities/User';
import { User } from '../Entities/FindUser';


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

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`http://localhost:3002/users/${userId}`)

    if (!response.ok) {
      console.error(`Error al obtener el usuario con ID ${userId}:`, response.statusText)
      return null
    }

    const data: User = await response.json()
    return data
  } catch (error) {
    console.error("Error de red al obtener el usuario:", error)
    return null
  }
}

// http://localhost:3002/searchHistory
// http://localhost:3002/news/category/{category}

