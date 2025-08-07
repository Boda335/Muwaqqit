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
        if (this.options.format === "iso")
            return timings;
        const formatted = {};
        for (const [key, time] of Object.entries(timings)) {
            if (this.options.format === "12h") {
                formatted[key] = this.to12h(time);
            }
            else {
                formatted[key] = this.to24h(time);
            }
        }
        return formatted;
    }
    to12h(time) {
        const [h, m] = time.split(":").map(Number);
        const period = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
    }
    to24h(time) {
        return time.replace(/( AM| PM)/, "");
    }
}
exports.PrayerTimes = PrayerTimes;
