// Controller/Hooks/Reports/useUsersRolesReport.ts
import { UsersRolesReport } from '@/app/Model/Entities/UsersRolesReport';
import { getUsersRolesReport } from '@/app/Model/Services/getUsersRolesReport';
import { useEffect, useState, useCallback } from 'react';

export const useUsersRolesReport = () => {
  const [report, setReport] = useState<UsersRolesReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersRolesReport();
      setReport(data);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { report, loading, error, refetch: fetchReport };
};
