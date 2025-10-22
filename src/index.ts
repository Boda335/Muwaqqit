import { fetchPrayerTimes, fetchPrayerCalendar, fetchPrayerCalendarRange, convertToHijri, convertToGregorian } from './api';
import { PrayerTimesOptions, PrayerTimings, CalendarResponse, HijriDate, GregorianDate } from './types';

export class PrayerTimes {
  private options: PrayerTimesOptions;

  constructor(options: PrayerTimesOptions) {
    this.options = options;
  }

  async getTimes(date: Date): Promise<PrayerTimings> {
    const timings = await fetchPrayerTimes(this.options, date);
    return this.formatTimings(timings);
  }

  async getMonth(month: number, year: number): Promise<CalendarResponse> {
    const data = await fetchPrayerCalendar(this.options, month, year);
    return data.map(entry => ({
      ...entry,
      timings: this.formatTimings(entry.timings),
    }));
  }

  async getRange(start: string, end: string): Promise<CalendarResponse> {
    const data = await fetchPrayerCalendarRange(this.options, start, end);
    return data.map(entry => ({
      ...entry,
      timings: this.formatTimings(entry.timings),
    }));
  }

  async toHijri(date: string): Promise<HijriDate> {
    return await convertToHijri(date);
  }

  async toGregorian(date: string): Promise<GregorianDate> {
    return await convertToGregorian(date);
  }

  private formatTimings(timings: PrayerTimings): PrayerTimings {
    if (this.options.format === 'iso') return timings;

    const formatted: Record<string, string> = {};
    for (const [key, time] of Object.entries(timings)) {
      if (this.options.format === '12h') {
        formatted[key] = this.to12h(time);
      } else {
        formatted[key] = this.to24h(time);
      }
    }
    return formatted as PrayerTimings;
  }

  private to12h(time: string): string {
    const clean = time.replace(/\s*\(.*?\)\s*/g, '').trim();
    const [h, m] = clean.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
  }

  private to24h(time: string): string {
    return time.replace(/( AM| PM)/, '');
  }
}
