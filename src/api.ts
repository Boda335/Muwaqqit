import axios from 'axios';
import { PrayerTimesOptions, PrayerTimings, CalendarResponse, HijriDate, GregorianDate } from './types';

export async function fetchPrayerTimes(opts: PrayerTimesOptions, date: Date): Promise<PrayerTimings> {
  const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const method = opts.method ?? 2;

  let url = '';

  if (opts.latitude && opts.longitude) {
    url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}`;
  } else if (opts.city && opts.country) {
    url = `https://api.aladhan.com/v1/timingsByCity?city=${opts.city}&country=${opts.country}&method=${method}&date=${dateStr}`;
  } else {
    throw new Error('You must provide either coordinates or city and country.');
  }

  const res = await axios.get(url);

  if (res.data.code !== 200) {
    throw new Error('Failed to fetch prayer times');
  }

  return res.data.data.timings;
}

export async function fetchPrayerCalendar(opts: PrayerTimesOptions, month: number, year: number): Promise<CalendarResponse> {
  const method = opts.method ?? 2;

  let url = '';
  if (opts.latitude && opts.longitude) {
    url = `https://api.aladhan.com/v1/calendar?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}&month=${month}&year=${year}`;
  } else if (opts.city && opts.country) {
    url = `https://api.aladhan.com/v1/calendarByCity?city=${opts.city}&country=${opts.country}&method=${method}&month=${month}&year=${year}`;
  } else {
    throw new Error('You must provide either coordinates or city and country.');
  }

  const res = await axios.get(url);
  if (res.data.code !== 200) {
    throw new Error('Failed to fetch prayer calendar');
  }

  return res.data.data;
}

export async function fetchPrayerCalendarRange(opts: PrayerTimesOptions, start: string, end: string): Promise<CalendarResponse> {
  const [sd, sm, sy] = start.split('-').map(Number);
  const [ed, em, ey] = end.split('-').map(Number);

  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);

  const results: any[] = [];

  let current = new Date(startDate);
  while (current <= endDate) {
    const timings = await fetchPrayerTimes(opts, current);

    results.push({
      date: {
        readable: current.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      },
      timings,
    });

    current.setDate(current.getDate() + 1);
  }

  return results;
}

export async function convertToHijri(date: string): Promise<HijriDate> {
  const url = `https://api.aladhan.com/v1/gToH?date=${date}`;
  const res = await axios.get(url);

  if (res.data.code !== 200) {
    throw new Error('Failed to convert to Hijri');
  }

  return res.data.data.hijri;
}

export async function convertToGregorian(date: string): Promise<GregorianDate> {
  const url = `https://api.aladhan.com/v1/hToG?date=${date}`;
  const res = await axios.get(url);

  if (res.data.code !== 200) {
    throw new Error('Failed to convert to Gregorian');
  }

  return res.data.data.gregorian;
}
