import axios from 'axios';
import { UsersActivityReportResponse } from '../Entities/UsersActivityReport';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.USERS_ACTIVITY_REPORT;

export const getUsersActivityReport = async (
  startDate: string,
  endDate: string
): Promise<UsersActivityReportResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.get<UsersActivityReportResponse>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: { startDate, endDate },
    });

    const data = response.data;

    // Redondear los porcentajes a un decimal
    return {
      totalUsers: data.totalUsers,
      activeUsers: data.activeUsers,
      inactiveUsers: data.inactiveUsers,
      percentActive: parseFloat(data.percentActive.toFixed(1)),
      percentInactive: parseFloat(data.percentInactive.toFixed(1)),
    };
  } catch (error) {
    console.error("Error al obtener el reporte de actividad de usuarios:", error);
    throw new Error("No se pudo obtener el reporte de actividad de usuarios");
  }
};
