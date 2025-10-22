import { PrayerTimesOptions, PrayerTimings, CalendarResponse, HijriDate, GregorianDate } from './types';
export declare function fetchPrayerTimes(opts: PrayerTimesOptions, date: Date): Promise<PrayerTimings>;
export declare function fetchPrayerCalendar(opts: PrayerTimesOptions, month: number, year: number): Promise<CalendarResponse>;
export declare function fetchPrayerCalendarRange(opts: PrayerTimesOptions, start: string, end: string): Promise<CalendarResponse>;
export declare function convertToHijri(date: string): Promise<HijriDate>;
export declare function convertToGregorian(date: string): Promise<GregorianDate>;
