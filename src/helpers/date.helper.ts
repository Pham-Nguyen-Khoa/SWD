export class DateHelper {

  static parseDateStringToDate(dateStr: string): Date {
    return new Date(dateStr + 'T00:00:00Z');
  }


  static formatDateToDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
