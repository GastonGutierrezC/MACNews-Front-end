import { useState } from 'react';
import { createUser } from '../../../Model/Services/UserService';
import { UserRegistration } from '../../../Model/Entities/User';
import { useUser } from '@/app/Controller/Context/UserContext';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { setUser } = useUser();

  const registerUser = async (userData: UserRegistration) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createUser(userData);
      console.log("Respuesta del backend:", response);

      const { UserID, UserFirstName, UserLastName, UserEmail, UserImageURL, PasswordUser, RoleAssigned} = response;
      
      console.log("Datos que se enviarán al contexto:", {
        id: UserID,
        UserFirstName,
        UserLastName,
        UserEmail,
        UserImageURL,
        PasswordUser,
        RoleAssigned
      });

      setUser({
        id: UserID,
        UserFirstName,
        UserLastName,
        UserEmail,
        UserImageURL,
        PasswordUser,
        RoleAssigned
      });

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Error al crear el usuario");
      console.error("Error al registrar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
