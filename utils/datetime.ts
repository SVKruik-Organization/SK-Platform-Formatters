import { DateDifference, DatetimeOptions, FormattedDate } from "../types";

/**
 * Timestamp Calculation
 * 
 * @param datetime Overwrite Date.now.
 * @param preferredLocale Overwrite default locale.
 * @returns Object with date, time and now.
 */
export function formatDate(datetime: Date | null = null, preferredLocale: Intl.Locale | null = null): FormattedDate {
    const targetDate: Date = datetime || new Date();
    const locale: Intl.Locale = preferredLocale || new Intl.Locale("en-US");

    const today: Date = new Date(targetDate.toLocaleString(locale, {
        timeZone: "Europe/Amsterdam"
    }));

    const hh: string = formatTime(today.getHours());
    const m: string = formatTime(today.getMinutes());

    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy: number = today.getFullYear();

    const date: string = `${dd}-${mm}-${yyyy}`;
    const time: string = `${hh}:${m}`;

    return { date, time, today };
}

/**
 * Time formatter.
 * 
 * @param value Add an extra zero if the input number is not double-digit.
 * @returns Formatted value.
 */
export function formatTime(value: number): string {
    return value < 10 ? "0" + value : value.toString();
}

/**
 * Converts a Date object to a human-readable time ago format.
 *
 * @param date Date object
 * @returns Formatted time ago string
 */
export function formatTimeAgo(date: Date): string {
    const seconds: number = (Date.now() - date.getTime()) / 1000;
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

/**
 * Calculate the difference between two dates and return hours and minutes.
 * 
 * @param dateFuture The newer date.
 * @param datePast The older date.
 * @returns Object of remaining hours and minutes.
 */
export function formatDifference(dateFuture: Date, datePast: Date): DateDifference {
    const dateDifference: number = dateFuture.getTime() - datePast.getTime();
    let hours: number = Math.floor((dateDifference % 86400000) / 3600000);
    let minutes: number = Math.round(((dateDifference % 86400000) % 3600000) / 60000);
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    return { hours, minutes };
}

/**
 * Convert DD-MM-YYYY to YYYY-MM-DD.
 * 
 * @param date The input date.
 * @returns The input date in ISO format.
 */
export function formatToISO(date: string): string {
    // DD-MM-YYYY
    const exploded: Array<string> = date.split('-');

    // YYYY-MM-DD
    return `${exploded[2]}-${exploded[1]}-${exploded[0]}`;
}

/**
 * Parse seperate date and time input to one Date object.
 * 
 * @param rawDate The day/month/year input.
 * @param rawTime The hour:minute input.
 * @param options Optional separators for date and time.
 * @returns The formatted Date object.
 * @throws Error when the date or time is invalid.
 */
export function datetimeParser(rawDate: string, rawTime: string, options?: DatetimeOptions): Date {
    const dateSeparator: string = options?.dateSeparator || "/";
    const timeSeparator: string = options?.timeSeparator || ":";

    const day: number = parseInt(rawDate.split(dateSeparator)[0]);
    const month: number = parseInt(rawDate.split(dateSeparator)[1]);
    const year: number = parseInt(rawDate.split(dateSeparator)[2]);

    const hour: number = parseInt(rawTime.split(timeSeparator)[0]);
    const minute: number = parseInt(rawTime.split(timeSeparator)[1]);

    if (day > 31 || month > 12 || year > new Date().getFullYear() + 2 || hour > 23 || minute > 59)
        throw new Error("Invalid date or time provided (1).");

    const fullDate: Date = new Date(year, month - 1, day, hour, minute);
    if (isNaN(fullDate.getTime()) || fullDate < formatDate(null, null).today)
        throw new Error("Invalid date or time provided (2).");

    return fullDate;
}