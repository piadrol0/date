import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number,
): [number, number, number] {
  const gDaysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  const gy2 = gm > 1 ? gy + 1 : gy;

  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    gDaysInMonth[gm];

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);

  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return [jy, jm, jd];
}

export function jalaliToGregorian(
  jy: number,
  jm: number,
  jd: number,
): [number, number, number] {
  const jy2 = jy - 979;
  const jm2 = jm - 1;
  const jd2 = jd - 1;

  let days =
    365 * jy2 +
    Math.floor(jy2 / 33) * 8 +
    Math.floor(((jy2 % 33) + 3) / 4) +
    78 +
    (jm2 < 6 ? jm2 * 31 : 6 * 31 + (jm2 - 6) * 30) +
    jd2;

  let gy = 1600 + 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days >= 36525) {
    days -= 1;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;

    if (days >= 365) {
      days += 1;
    }
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days >= 366) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let gd = days + 1;
  let gm = 0;

  while (
    gm < 12 &&
    gd >
      gDaysInMonth[gm] +
        (gm === 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)
          ? 1
          : 0)
  ) {
    gd -=
      gDaysInMonth[gm] +
      (gm === 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)
        ? 1
        : 0);

    gm += 1;
  }

  return [gy, gm + 1, gd];
}
