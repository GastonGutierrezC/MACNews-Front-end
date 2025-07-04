// app/Hooks/useUpdateUser.ts
import { useState } from 'react';
import { UserUpdate } from '../../../Model/Entities/UserUpdate';
import { updateUser } from '@/app/Model/Services/UserUpdateService';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const modifyUser = async (userData: UserUpdate) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateUser(userData);
      console.log("[useUpdateUser] Usuario actualizado desde backend:", response);
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
