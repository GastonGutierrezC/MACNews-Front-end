import { useEffect, useState, useCallback } from "react";
import { UsersPendingApplicationReport } from "@/app/Model/Entities/UsersPendingApplicationReport";
import { getUsersPendingApplicationReport } from "@/app/Model/Services/getUsersPendingApplicationReport";

export const useUsersPendingApplicationReport = () => {
  const [data, setData] = useState<UsersPendingApplicationReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getUsersPendingApplicationReport();
      setData(result);
      setError(null);
    } catch (err) {
      console.error("[useUsersPendingApplicationReport] Error:", err);
      setError("Error al obtener el reporte de usuarios con aplicación pendiente");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refreshData: fetchReport };
};
