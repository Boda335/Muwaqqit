import { fetchPrayerTimes } from "./api";
import { PrayerTimesOptions, PrayerTimings } from "./types";

export class PrayerTimes {
  private options: PrayerTimesOptions;

  constructor(options: PrayerTimesOptions) {
    this.options = options;
  }

  async getTimes(date: Date): Promise<PrayerTimings> {
    const timings = await fetchPrayerTimes(this.options, date);

    if (this.options.format === "iso") return timings;

    const formatted: Record<string, string> = {};
    for (const [key, time] of Object.entries(timings)) {
      if (this.options.format === "12h") {
        formatted[key] = this.to12h(time);
      } else {
        formatted[key] = this.to24h(time);
      }
    }

    return formatted as PrayerTimings;
  }

  private to12h(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
  }

  private to24h(time: string): string {
    return time.replace(/( AM| PM)/, "");
  }
}
