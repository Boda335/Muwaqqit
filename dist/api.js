"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPrayerTimes = fetchPrayerTimes;
exports.fetchPrayerCalendar = fetchPrayerCalendar;
exports.fetchPrayerCalendarRange = fetchPrayerCalendarRange;
exports.convertToHijri = convertToHijri;
exports.convertToGregorian = convertToGregorian;
const axios_1 = __importDefault(require("axios"));
async function fetchPrayerTimes(opts, date) {
    var _a;
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const method = (_a = opts.method) !== null && _a !== void 0 ? _a : 2;
    let url = '';
    if (opts.latitude && opts.longitude) {
        url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}`;
    }
    else if (opts.city && opts.country) {
        url = `https://api.aladhan.com/v1/timingsByCity?city=${opts.city}&country=${opts.country}&method=${method}&date=${dateStr}`;
    }
    else {
        throw new Error('You must provide either coordinates or city and country.');
    }
    const res = await axios_1.default.get(url);
    if (res.data.code !== 200) {
        throw new Error('Failed to fetch prayer times');
    }
    return res.data.data.timings;
}
async function fetchPrayerCalendar(opts, month, year) {
    var _a;
    const method = (_a = opts.method) !== null && _a !== void 0 ? _a : 2;
    let url = '';
    if (opts.latitude && opts.longitude) {
        url = `https://api.aladhan.com/v1/calendar?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}&month=${month}&year=${year}`;
    }
    else if (opts.city && opts.country) {
        url = `https://api.aladhan.com/v1/calendarByCity?city=${opts.city}&country=${opts.country}&method=${method}&month=${month}&year=${year}`;
    }
    else {
        throw new Error('You must provide either coordinates or city and country.');
    }
    const res = await axios_1.default.get(url);
    if (res.data.code !== 200) {
        throw new Error('Failed to fetch prayer calendar');
    }
    return res.data.data;
}
async function fetchPrayerCalendarRange(opts, start, end) {
    const [sd, sm, sy] = start.split('-').map(Number);
    const [ed, em, ey] = end.split('-').map(Number);
    const startDate = new Date(sy, sm - 1, sd);
    const endDate = new Date(ey, em - 1, ed);
    const results = [];
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
async function convertToHijri(date) {
    const url = `https://api.aladhan.com/v1/gToH?date=${date}`;
    const res = await axios_1.default.get(url);
    if (res.data.code !== 200) {
        throw new Error('Failed to convert to Hijri');
    }
    return res.data.data.hijri;
}
async function convertToGregorian(date) {
    const url = `https://api.aladhan.com/v1/hToG?date=${date}`;
    const res = await axios_1.default.get(url);
    if (res.data.code !== 200) {
        throw new Error('Failed to convert to Gregorian');
    }
    return res.data.data.gregorian;
}
