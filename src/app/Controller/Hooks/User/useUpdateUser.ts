// app/Hooks/useUpdateUser.ts
import { useState } from 'react';
import { UserUpdate } from '../../../Model/Entities/UserUpdate';
import { useUser } from '@/app/Controller/Context/UserContext';
import { updateUser } from '@/app/Model/Services/UserUpdateService';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { user, setUser } = useUser();

  const modifyUser = async (userData: UserUpdate) => {
    if (!user?.id) {
      setError("No hay un usuario autenticado para actualizar.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateUser(user.id, userData);
      console.log("[useUpdateUser] Usuario actualizado desde backend:", response);

      // Aquí normalizamos los datos recibidos para el contexto del usuario
      const userToUpdate = {
        id: response.user.UserID,
        UserFirstName: response.user.UserFirstName,
        UserLastName: response.user.UserLastName,
        UserEmail: response.user.UserEmail,
        UserImageURL: response.user.UserImageURL,
        PasswordUser: response.password.PasswordUser,
        RoleAssigned: response.password.RoleAssigned,  // Si necesitas la contraseña también
      };

      // Pasamos el objeto con la estructura correcta al contexto
      setUser(userToUpdate);

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Error al actualizar el usuario");
      console.error("Error al actualizar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return { modifyUser, loading, error, success };
};
