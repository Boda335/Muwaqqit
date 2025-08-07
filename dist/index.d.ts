import { PrayerTimesOptions, PrayerTimings } from "./types";
export declare class PrayerTimes {
    private options;
    constructor(options: PrayerTimesOptions);
    getTimes(date: Date): Promise<PrayerTimings>;
    private to12h;
    private to24h;
}
