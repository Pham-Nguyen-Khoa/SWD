export class DateHelper {

  static parseDateStringToDate(dateStr: string): Date {
    return new Date(dateStr + 'T00:00:00Z');
  }


  static formatDateToDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static formatDateToDDMMYYYY(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
  static formatDateToDDMMYYYYHHmm(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
