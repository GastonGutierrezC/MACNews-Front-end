import { ApplicationFormEvaluation } from '../Entities/ApplicationFormEvaluation';
import { ApplicationFormEvaluationResult } from '../Entities/ApplicationFormEvaluationResult';

const API_URL = 'http://localhost:3002/applicationForm/evaluate-with-agent';

export const evaluateApplicationForm = async (
  formData: ApplicationFormEvaluation
): Promise<ApplicationFormEvaluationResult> => {
  try {
    const token = localStorage.getItem('token'); // ✅ Obtenemos el token
    if (!token) throw new Error('Token no encontrado');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Token incluido aquí
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error(`❌ Error HTTP: ${response.status}`);
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data: ApplicationFormEvaluationResult = await response.json();

    console.log("✅ Formulario evaluado correctamente:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error al enviar el formulario:", error.message || error);
    throw new Error("No se pudo evaluar el formulario (token)");
  }
};
