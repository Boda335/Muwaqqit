"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrayerTimes = void 0;
const api_1 = require("./api");
class PrayerTimes {
    constructor(options) {
        this.options = options;
    }
    async getTimes(date) {
        const timings = await (0, api_1.fetchPrayerTimes)(this.options, date);
        return this.formatTimings(timings);
    }
    async getMonth(month, year) {
        const data = await (0, api_1.fetchPrayerCalendar)(this.options, month, year);
        return data.map(entry => ({
            ...entry,
            timings: this.formatTimings(entry.timings),
        }));
    }
    async getRange(start, end) {
        const data = await (0, api_1.fetchPrayerCalendarRange)(this.options, start, end);
        return data.map(entry => ({
            ...entry,
            timings: this.formatTimings(entry.timings),
        }));
    }
    async toHijri(date) {
        return await (0, api_1.convertToHijri)(date);
    }
    async toGregorian(date) {
        return await (0, api_1.convertToGregorian)(date);
    }
    formatTimings(timings) {
        if (this.options.format === 'iso')
            return timings;
        const formatted = {};
        for (const [key, time] of Object.entries(timings)) {
            if (this.options.format === '12h') {
                formatted[key] = this.to12h(time);
            }
            else {
                formatted[key] = this.to24h(time);
            }
        }
        return formatted;
    }
    to12h(time) {
        const clean = time.replace(/\s*\(.*?\)\s*/g, '').trim();
        const [h, m] = clean.split(':').map(Number);
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
    }
    to24h(time) {
        return time.replace(/( AM| PM)/, '');
    }
}
exports.PrayerTimes = PrayerTimes;
