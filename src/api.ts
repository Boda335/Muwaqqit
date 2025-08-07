import axios from "axios";
import { PrayerTimesOptions, PrayerTimings } from "./types";

export async function fetchPrayerTimes(
  opts: PrayerTimesOptions,
  date: Date
): Promise<PrayerTimings> {
  const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const method = opts.method ?? 2;

  let url = "";

  if (opts.latitude && opts.longitude) {
    url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}`;
  } else if (opts.city && opts.country) {
    url = `https://api.aladhan.com/v1/timingsByCity?city=${opts.city}&country=${opts.country}&method=${method}&date=${dateStr}`;
  } else {
    throw new Error("You must provide either coordinates or city and country.");
  }

  const res = await axios.get(url);

  if (res.data.code !== 200) {
    throw new Error("Failed to fetch prayer times");
  }

  return res.data.data.timings;
}
