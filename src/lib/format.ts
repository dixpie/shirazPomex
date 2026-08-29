import jalaali from "jalaali-js";

export function formatToman(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function toJalaliDate(date: Date | string): string {
  const d = new Date(date);
  const { jy, jm, jd } = jalaali.toJalaali(d);
  return `${jd} ${monthNames[jm - 1]} ${jy}`;
}
