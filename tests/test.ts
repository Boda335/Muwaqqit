import { PrayerTimes } from "../src/index";

const pt = new PrayerTimes({
  city: "Cairo",
  country: "Egypt",
  method: 5,
  format: "24h",
});

pt.getTimes(new Date())
  .then(console.log)
  .catch(console.error);
