export interface PrayerTimesOptions {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  method?: number;
  format?: "12h" | "24h" | "iso";
  timezone?: string;
}

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface CalendarEntry {
  date: {
    readable: string;
    timestamp: string;
    gregorian: GregorianDate;
    hijri: HijriDate;
  };
  timings: PrayerTimings;
}

export type CalendarResponse = CalendarEntry[];

export interface GregorianDate {
  date: string;
  format?: string;
  day?: string;
  weekday?: { en: string; ar?: string };
  month?: { number: number; en: string; ar?: string };
  year?: string;
}

export interface HijriDate {
  date: string;
  format?: string;
  day?: string;
  weekday?: { en: string; ar?: string };
  month?: { number: number; en: string; ar?: string };
  year?: string;
}
