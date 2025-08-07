"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPrayerTimes = fetchPrayerTimes;
const axios_1 = __importDefault(require("axios"));
async function fetchPrayerTimes(opts, date) {
    var _a;
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const method = (_a = opts.method) !== null && _a !== void 0 ? _a : 2;
    let url = "";
    if (opts.latitude && opts.longitude) {
        url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${method}`;
    }
    else if (opts.city && opts.country) {
        url = `https://api.aladhan.com/v1/timingsByCity?city=${opts.city}&country=${opts.country}&method=${method}&date=${dateStr}`;
    }
    else {
        throw new Error("You must provide either coordinates or city and country.");
    }
    const res = await axios_1.default.get(url);
    if (res.data.code !== 200) {
        throw new Error("Failed to fetch prayer times");
    }
    return res.data.data.timings;
}
