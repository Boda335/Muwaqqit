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
