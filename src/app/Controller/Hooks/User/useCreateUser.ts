import { useState } from 'react';
import { createUser } from '../../../Model/Services/UserService';
import { UserRegistration } from '../../../Model/Entities/User';
import { useToken } from '../../Context/UserContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { setToken } = useToken();
  const router = useRouter();

  const registerUser = async (userData: UserRegistration) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await createUser(userData);
      console.log('[useCreateUser] Token recibido:', token);

      setToken(token);
      setSuccess(true);
    } catch (err: any) {
      console.error('[useCreateUser] Error al registrar usuario:', err);

      // Si el error tiene un mensaje conocido, lo mostramos
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        // Error desconocido -> redirigimos a HOME
        router.push(ROUTES.HOME);
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
