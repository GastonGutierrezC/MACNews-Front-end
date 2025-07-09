// app/Utils/GeneralConvertions/CategoryConverter.ts

export class CategoryConverter {
  // Mapa de inglés a español
  private static categoryMap: Record<string, string> = {
    Politics: "Política",
    Economy: "Economía",
    Sports: "Deportes",
    Entertainment: "Entretenimiento",
    Technology: "Tecnología",
    Health: "Salud",
    Science: "Ciencia",
    International: "Internacional",
    Society: "Sociedad",
    Security: "Seguridad",
  };

  /**
   * Convierte una categoría en inglés a español.
   * Si no la encuentra, devuelve el mismo string.
   */
  static toSpanish(categoryEN: string): string {
    return this.categoryMap[categoryEN] || categoryEN;
  }
}
