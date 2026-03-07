import { NewsReviewReport } from "@/app/Model/Entities/NewsReviewReport";
import { getNewsReviewReport } from "@/app/Model/Services/getNewsReviewReport";
import { useState, useEffect } from "react";

export const useNewsReviewReport = (startDate: string, endDate: string) => {
  const [report, setReport] = useState<NewsReviewReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getNewsReviewReport(startDate, endDate);
        setReport(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchReport();
    }
  }, [startDate, endDate]);

  return { report, loading, error };
};
