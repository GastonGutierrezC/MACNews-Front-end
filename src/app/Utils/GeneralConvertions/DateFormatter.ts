// app/Utils/DateFormatter.ts

export class DateFormatter {
  /**
   * Convierte un string ISO en formato 'dd/mm/yyyy'
   */
  static formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
 * Convierte una fecha en formato 'dd/mm/yyyy' a ISO completo 'yyyy-mm-ddT00:00:00.000Z'
 */
static toISODate(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) {
    throw new Error('Formato de fecha inválido. Se esperaba dd/mm/yyyy');
  }
  const iso = new Date(`${year}-${month}-${day}T00:00:00Z`);
  return iso.toISOString(); // Retorna: '2025-07-08T00:00:00.000Z'
}

}
