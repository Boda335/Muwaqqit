![Logo](https://l.top4top.io/p_3582op1r91.png)

<div align="center">

![Discord](https://img.shields.io/discord/1006273962986188881?logo=discord&logoColor=%23fff&logoSize=auto&label=Discord&labelColor=%23505050&color=%235E6AE9&link=https%3A%2F%2Fdiscord.gg%2Fethical-programmer-s-1188398653530984539)
![NPM License](https://img.shields.io/npm/l/muwaqqit?color=5E6AE9&label=License)

</div>

# Muwaqqit

**Muwaqqit** is a modern and flexible TypeScript library for fetching Islamic prayer times, full calendars, and Hijri/Gregorian date conversions — powered by the [AlAdhan API](https://aladhan.com/prayer-times-api).

```
🕌 Built with AlAdhan API
📅 Supports full-month and date-range calendars
🕰️ Works with city/country or GPS coordinates
🗓️ Converts between Gregorian ↔ Hijri
```

---

## 🔥 Features

- 🌍 Fetch times by **city/country** or **latitude/longitude**
- 🕰️ Retrieve **daily** prayer times
- 📅 Retrieve **monthly** prayer calendar
- 📆 Retrieve prayer times for a **custom date range**
- 🗓️ Convert between **Gregorian ↔ Hijri** dates
- 🧮 Choose from multiple **calculation methods**
- ⏱️ Choose **12h / 24h / ISO** time formats
- 💡 Written in TypeScript — ready for Node.js, bots & web apps

---

## 📦 Installation

```bash
npm install muwaqqit
```

---

## 💡 Usage Example

### TypeScript (ES Modules)

```ts
import { PrayerTimes } from 'muwaqqit';

const pt = new PrayerTimes({
  city: 'Cairo',
  country: 'Egypt',
  method: 5, // Egyptian General Authority of Survey
  format: '12h',
});

// 1️⃣ Today's prayer times
const today = await pt.getTimes(new Date());
console.table(today);

// 2️⃣ Full month calendar
const month = await pt.getMonth(10, 2025);
month.forEach(day => {
  console.log(`${day.date.readable} → Fajr: ${day.timings.Fajr}, Dhuhr: ${day.timings.Dhuhr}, Asr: ${day.timings.Asr}, Maghrib: ${day.timings.Maghrib}, Isha: ${day.timings.Isha}`);
});

// 3️⃣ Date range (1–7 Oct 2025)
const range = await pt.getRange('01-10-2025', '07-10-2025');
range.forEach(day => console.log(day.date.readable, day.timings));

// 4️⃣ Gregorian → Hijri
const hijri = await pt.toHijri('23-10-2025');
console.table(hijri);

// 5️⃣ Hijri → Gregorian
const gregorian = await pt.toGregorian('20-04-1447');
console.table(gregorian);
```

---

### JavaScript (CommonJS)

```js
const { PrayerTimes } = require('muwaqqit');

const pt = new PrayerTimes({
  city: 'Cairo',
  country: 'Egypt',
  method: 5,
  format: '24h',
});

(async () => {
  const times = await pt.getTimes(new Date());
  console.log("Today's Prayer Times:", times);
})();
```

---

## 🧠 API Reference

### `new PrayerTimes(options)`

| Option      | Type                          | Required | Description                                      |
| ----------- | ----------------------------- | -------- | ------------------------------------------------ |
| `city`      | `string`                      | ✅       | City name _(required if not using latitude)_     |
| `country`   | `string`                      | ✅       | Country name _(required if not using latitude)_  |
| `latitude`  | `number`                      | ✅       | Decimal latitude _(required if not using city)_  |
| `longitude` | `number`                      | ✅       | Decimal longitude _(required if not using city)_ |
| `method`    | `number`                      | ❌       | Calculation method _(default = 2)_               |
| `format`    | `"12h"` \| `"24h"` \| `"iso"` | ❌       | Output time format _(default = "24h")_           |
| `timezone`  | `string`                      | ❌       | Optional timezone override                       |

---

### 🧩 Methods

| Method                                  | Description                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `getTimes(date: Date)`                  | Get daily prayer times for a specific date                                      |
| `getMonth(month: number, year: number)` | Get full calendar for a month                                                   |
| `getRange(start: string, end: string)`  | Get prayer times for a custom date range (e.g., `"01-10-2025"`, `"07-10-2025"`) |
| `toHijri(date: string)`                 | Convert Gregorian date to Hijri                                                 |
| `toGregorian(date: string)`             | Convert Hijri date to Gregorian                                                 |

---

## 🛠️ Calculation Methods

Based on [AlAdhan API](https://aladhan.com/prayer-times-api#GetTimings):

| ID  | Method                                        |
| --- | --------------------------------------------- |
| 0   | Shia Ithna-Ashari                             |
| 1   | University of Islamic Sciences, Karachi       |
| 2   | Islamic Society of North America              |
| 3   | Muslim World League                           |
| 4   | Umm Al-Qura University, Makkah                |
| 5   | Egyptian General Authority of Survey          |
| 7   | Institute of Geophysics, University of Tehran |
| 12  | Union Organization Islamic de France          |
| ... | (see full list on AlAdhan API docs)           |

---

## 📬 Feedback & Support

- 💬 [Join our Discord](https://discord.gg/AT6W2nHEVz)
- 🧠 Open an issue or pull request on GitHub

---

## 📘 License

This project is licensed under the **Apache-2.0 License** — see the [`LICENSE`](./LICENSE) file for details.
