import { useState } from 'react';
import { verifyApplicationForm } from '@/app/Model/Services/VerifyApplicationService';

export const useVerifyApplication = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const verifyForm = async (applicationId: string, verificationStatus: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await verifyApplicationForm(applicationId, verificationStatus);
      setSuccess(result);
    } catch (err: any) {
      setError(err.message || 'Error al verificar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return { verifyForm, loading, error, success };
};
