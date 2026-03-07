import axios from 'axios';
import { UsersByMonthReportResponse } from '../Entities/UsersByMonthReport';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

// Definimos la URL base desde endpoints
const API_URL = ENDPOINTS.USERS_BY_MONTH_REPORT;

export const getUsersByMonthReport = async (
  startDate: string,
  endDate: string
): Promise<UsersByMonthReportResponse> => {
  try {
    console.log("Obteniendo reporte de usuarios por mes:", { startDate, endDate });

    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.get<UsersByMonthReportResponse>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate,
      },
    });

    console.log("Respuesta del backend (UsersByMonthReport):", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al obtener el reporte de usuarios por mes:", error);
    throw new Error("No se pudo obtener el reporte de usuarios por mes");
  }
};
