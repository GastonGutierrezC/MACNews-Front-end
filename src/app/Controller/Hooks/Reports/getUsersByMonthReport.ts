import { useState, useEffect } from 'react';
import { UsersByMonthReportResponse } from '@/app/Model/Entities/UsersByMonthReport';
import { getUsersByMonthReport } from '@/app/Model/Services/UsersByMonthReportService';

interface UseUsersByMonthReportProps {
  startDate: string;
  endDate: string;
}

export const useUsersByMonthReport = ({ startDate, endDate }: UseUsersByMonthReportProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<UsersByMonthReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersByMonthReport(startDate, endDate);
      setReport(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener el reporte de usuarios por mes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchReport();
    }
  }, [startDate, endDate]);

  return {
    loading,
    report,
    error,
    refetch: fetchReport,
  };
};
