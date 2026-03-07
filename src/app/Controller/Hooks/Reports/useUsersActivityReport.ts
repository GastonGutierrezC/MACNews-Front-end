import { useState, useEffect } from 'react';
import { getUsersActivityReport } from '@/app/Model/Services/getUsersActivityReport';
import { UsersActivityReportResponse } from '@/app/Model/Entities/UsersActivityReport';

export const useUsersActivityReport = (startDate: string, endDate: string) => {
  const [report, setReport] = useState<UsersActivityReportResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const data = await getUsersActivityReport(startDate, endDate);
        setReport(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [startDate, endDate]);

  return { report, loading, error };
};
