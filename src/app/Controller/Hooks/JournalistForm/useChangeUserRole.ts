import { useState } from 'react';
import { changeUserRole } from '@/app/Model/Services/ChangeUserRoleService';

export const useChangeUserRole = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateRole = async (userId: string, roleAssigned: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await changeUserRole(userId, roleAssigned);
      setSuccess(result);
    } catch (err: any) {
      setError(err.message || 'Error al cambiar el rol del usuario');
    } finally {
      setLoading(false);
    }
  };

  return { updateRole, loading, error, success };
};
