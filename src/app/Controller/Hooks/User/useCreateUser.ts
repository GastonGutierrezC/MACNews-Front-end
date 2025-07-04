import { useState } from 'react';
import { createUser } from '../../../Model/Services/UserService';
import { UserRegistration } from '../../../Model/Entities/User';
import { useToken } from '../../Context/UserContext';


export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { setToken } = useToken();

  const registerUser = async (userData: UserRegistration) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await createUser(userData);
      console.log('[useCreateUser] Token recibido:', token);

      setToken(token); // ✅ Guardamos el token en el contexto
      setSuccess(true);
    } catch (error: any) {
      console.error('[useCreateUser] Error al registrar usuario:', error);
      setError(error.message || 'Error al crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
