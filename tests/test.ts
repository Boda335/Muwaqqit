import { PrayerTimes } from '../src/index';

(async () => {
  const options = {
    city: 'Cairo',
    country: 'Egypt',
    method: 5,
    format: '12h' as const,
  };

  const prayer = new PrayerTimes(options);

  console.log('==============================================');
  console.log('🕌  Full Test for muwaqqit Library');
  console.log('==============================================\n');

  const today = await prayer.getTimes(new Date());
  console.log('🕰️ Prayer times for today:');
  console.table(today);
  console.log('\n----------------------------------------------\n');

  const now = new Date();
  const month = await prayer.getMonth(now.getMonth() + 1, now.getFullYear());
  console.log(`📅 Monthly calendar (${now.getMonth() + 1}/${now.getFullYear()}):`);
  console.log(`Total days: ${month.length}`);

  const printAll = true;
  const dayNumber = 2;

  if (printAll) {
    console.log('\n📆 Full month prayer times:\n');
    console.table(
      month.map(day => ({
        Date: day.date.readable,
        Fajr: day.timings.Fajr,
        Sunrise: day.timings.Sunrise,
        Dhuhr: day.timings.Dhuhr,
        Asr: day.timings.Asr,
        Maghrib: day.timings.Maghrib,
        Isha: day.timings.Isha,
        Imsak: day.timings.Imsak,
        Midnight: day.timings.Midnight,
      }))
    );
  } else {
    const selected = month[dayNumber - 1];
    console.log(`📅 Prayer times for day ${dayNumber} of the month:`);
    console.table(selected.timings);
  }

  console.log('\n----------------------------------------------\n');

  const range = await prayer.getRange('01-10-2025', '07-10-2025');
  console.log('📆 Prayer times from 1 to 7 October 2025:');
  console.table(
    range.map(day => ({
      Date: day.date.readable,
      Fajr: day.timings.Fajr,
      Sunrise: day.timings.Sunrise,
      Dhuhr: day.timings.Dhuhr,
      Asr: day.timings.Asr,
      Maghrib: day.timings.Maghrib,
      Isha: day.timings.Isha,
    }))
  );

  console.log('\n----------------------------------------------\n');

  const hijri = await prayer.toHijri('23-10-2025');
  console.log('🗓️ Convert Gregorian → Hijri (23-10-2025):');
  console.table(hijri);

  console.log('\n----------------------------------------------\n');

  const gregorian = await prayer.toGregorian('20-04-1447');
  console.log('🗓️ Convert Hijri → Gregorian (20-04-1447):');
  console.table(gregorian);

  console.log('\n----------------------------------------------\n');
  console.log('✅ All results printed successfully!');
  console.log('==============================================\n');
})();
