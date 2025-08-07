
![Logo](https://i.postimg.cc/wvMNxrBh/Add-a-heading-2.png)

<div align="center">

![Discord](https://img.shields.io/discord/1006273962986188881?logo=discord&logoColor=%23fff&logoSize=auto&label=Discord&labelColor=%23505050&color=%235E6AE9&link=https%3A%2F%2Fdiscord.gg%2Fethical-programmer-s-1188398653530984539)
![NPM License](https://img.shields.io/npm/l/muwaqqit?color=5E6AE9&label=License)

</div>

# Muwaqqit

**Muwaqqit** is a powerful utility to fetch Islamic prayer times using location (city/country or coordinates). Ideal for Discord bots, web apps, and Islamic tools.

```
🕌 Built using the AlAdhan API  
🧠 Supports flexible time formats and multiple calculation methods
```

---

## 🔥 Features

- 🌍 Supports city/country OR latitude/longitude
- 📆 Fetch times for today or any date
- 🧮 Choose from multiple calculation methods
- 🕰️ Return times in 12h, 24h, or ISO format
- 🌐 Auto timezone handling (or custom override)
- 💡 Built in TypeScript, ready for Node.js apps & bots

---

## 📦 Installation

```bash
npm install muwaqqit
```

---

## 💡 Usage Example

### TypeScript (ES Modules)

```ts
import { PrayerTimes } from "muwaqqit";

const pt = new PrayerTimes({
  city: "Cairo",
  country: "Egypt",
  method: 5, // Muslim World League
  format: "24h"
});

const times = await pt.getTimes(new Date());

console.log(times);
/*
{
  Fajr: '04:10',
  Dhuhr: '12:45',
  Asr: '16:15',
  Maghrib: '19:00',
  Isha: '20:30'
}
*/
```

---

### JavaScript (CommonJS)

```js
const { PrayerTimes } = require("muwaqqit");

const pt = new PrayerTimes({
  city: "Cairo",
  country: "Egypt",
  method: 5,
  format: "12h"
});

pt.getTimes(new Date())
  .then(times => {
    console.log("Prayer Times:");
    console.log(`Fajr: ${times.Fajr}`);
    console.log(`Dhuhr: ${times.Dhuhr}`);
    console.log(`Asr: ${times.Asr}`);
    console.log(`Maghrib: ${times.Maghrib}`);
    console.log(`Isha: ${times.Isha}`);
  })
  .catch(err => console.error("Error:", err));
```

---

## 🧠 API Reference

### `new PrayerTimes(options)`

| Option       | Type                                 | Required | Description |
|--------------|--------------------------------------|----------|-------------|
| `city`       | `string`                             | ✅      | City name *(required if not using `latitude`)* |
| `country`    | `string`                             | ✅     | Country name *(required if not using `latitude`)* |
| `latitude`   | `number`                             | ✅    | Decimal latitude *(required if not using `city`)* |
| `longitude`  | `number`                             | ✅    | Decimal longitude *(required if not using `city`)* |
| `method`     | `number`                             | ❌       | Calculation method ID *(default = 2)* |
| `format`     | `"12h"` \| `"24h"` \| `"iso"`        | ❌       | Time format *(default = "24h")* |
| `timezone`   | `string` (IANA timezone e.g. `Africa/Cairo`) | ❌ | Optional timezone override |

> 📝 **Note:** You must provide either:
> - `city` and `country`, **OR**
> - `latitude` and `longitude`
  

## 🛠️ Calculation Methods

Based on [AlAdhan API](https://aladhan.com/prayer-times-api#GetTimings):

- 0 = Shia Ithna-Ashari
- 1 = University of Islamic Sciences, Karachi
- 2 = Islamic Society of North America
- 3 = Muslim World League
- 4 = Umm Al-Qura University, Makkah
- 5 = Egyptian General Authority of Survey
- ...

---

## 📬 Feedback & Support

- 💬 [Join our Discord](https://dsc.gg/enexus)
- 🧠 Open an issue or pull request anytime

---

## 📘 License

This project is licensed under the MIT License — see the [`LICENSE`](./LICENSE) file for details.
