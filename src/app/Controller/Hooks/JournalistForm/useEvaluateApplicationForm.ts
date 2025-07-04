import { useState } from 'react';
import { ApplicationFormEvaluation } from '@/app/Model/Entities/ApplicationFormEvaluation';
import { evaluateApplicationForm } from '@/app/Model/Services/ApplicationFormService';
import { ApplicationFormEvaluationResult } from '@/app/Model/Entities/ApplicationFormEvaluationResult';

export const useEvaluateApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApplicationFormEvaluationResult | null>(null);

  const submitApplication = async (formData: ApplicationFormEvaluation) => {
    setLoading(true);
    setError(null);

    try {
      const response = await evaluateApplicationForm(formData);
      console.log('[useEvaluateApplicationForm] Evaluación completada:', response);
      setResult(response);
      return response;
    } catch (err: any) {
      console.error('[useEvaluateApplicationForm] Error:', err);
      setError(err.message || 'Error desconocido');
      setResult(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    result,
    submitApplication,
  };
};
