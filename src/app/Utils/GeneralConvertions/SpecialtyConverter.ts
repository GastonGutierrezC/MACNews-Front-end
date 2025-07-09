// app/Utils/GeneralConvertions/SpecialtyConverter.ts

export class SpecialtyConverter {
  // Mapa de inglés a español para especialidades periodísticas
  private static specialtyMap: Record<string, string> = {
    Investigative: "Investigativo",
    Interview: "Entrevista",
    Opinion: "Opinión",
    Interpretive: "Interpretativo",
    Data: "Datos",
    Social: "Social",
    Political: "Político",
    Scientific: "Científico",
    Entertainment: "Entretenimiento",
    Business: "Negocios",
  };

  /**
   * Convierte una especialidad en inglés a español.
   * Si no la encuentra, devuelve el mismo string.
   */
  static toSpanish(specialtyEN: string): string {
    return this.specialtyMap[specialtyEN] || specialtyEN;
  }
}
