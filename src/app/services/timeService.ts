/**
 * Servicio para manejar operaciones relacionadas con fechas y tiempos
 * Utiliza la API de WorldTime para obtener la hora actual de México
 */
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export class TimeService {
  private static readonly WORLDTIME_API_URL = 'https://worldtimeapi.org/api/timezone/America/Mexico_City';
  private static readonly DATE_LIMIT = new Date('2025-09-30T23:59:59');
  
  /**
   * Obtiene la hora actual de México usando una API pública
   * @returns La fecha actual en formato Date
   */
  static async getCurrentMexicoTime(): Promise<Date> {
    try {
      const response = await fetch(this.WORLDTIME_API_URL);
      
      if (!response.ok) {
        throw new Error(`Error al obtener la hora: ${response.status}`);
      }
      
      const data = await response.json();
      return new Date(data.datetime);
    } catch (error) {
      console.error('Error al obtener la hora de México:', error);
      // En caso de error, utilizamos la hora local como respaldo
      console.warn('Utilizando la hora local como respaldo');
      return new Date();
    }
  }
  
  /**
   * Verifica si la fecha actual es anterior a la fecha límite para modificar asistencia
   * @returns true si todavía es posible descancelar la asistencia, false si ya pasó la fecha límite
   */
  static async isBeforeDeadline(): Promise<boolean> {
    const currentTime = await this.getCurrentMexicoTime();
    return currentTime < this.DATE_LIMIT;
  }

  /**
   * Retorna la fecha límite formateada para mostrar en mensajes
   * @returns La fecha límite en formato legible (ej: "30 de septiembre de 2025")
   */
  static getFormattedDeadline(): string {
    dayjs.locale('es');
    return dayjs(this.DATE_LIMIT).format('D [de] MMMM [de] YYYY');
  }
} 