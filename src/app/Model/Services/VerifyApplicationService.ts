import axios from 'axios';
import { ENDPOINTS } from '@/app/Utils/EnpointsBackEnd/enpoints';

const API_URL = ENDPOINTS.VERIFY_APPLICATION; // Ej: 'http://localhost:5249/api/applicationForm/verification/'

export const verifyApplicationForm = async (
  applicationId: string,
  verificationStatus: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token de autenticación no disponible");

    const response = await axios.patch(
      `${API_URL}${applicationId}`,
      { VerificationStatus: verificationStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Retornamos true si el status es 200
    return response.status === 200;
  } catch (error) {
    console.error("Error al verificar el formulario:", error);
    throw new Error("No se pudo verificar el formulario");
  }
};
