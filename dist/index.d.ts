import { PrayerTimesOptions, PrayerTimings, CalendarResponse, HijriDate, GregorianDate } from './types';
export declare class PrayerTimes {
    private options;
    constructor(options: PrayerTimesOptions);
    getTimes(date: Date): Promise<PrayerTimings>;
    getMonth(month: number, year: number): Promise<CalendarResponse>;
    getRange(start: string, end: string): Promise<CalendarResponse>;
    toHijri(date: string): Promise<HijriDate>;
    toGregorian(date: string): Promise<GregorianDate>;
    private formatTimings;
    private to12h;
    private to24h;
}
