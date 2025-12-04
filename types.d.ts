// Date and Time
export function formatDate(datetime?: Date, preferredLocale?: Intl.Locale): FormattedDate;
export function formatTime(value: number): string;
export function formatTimeAgo(date: Date): string;
export function formatDifference(dateFuture: Date, datePast: Date): DateDifference;
export function formatToISO(date: string): string;
export function datetimeParser(rawDate: string, rawTime: string, options?: DatetimeOptions): Date;


// Logger
export function logData(data: string, type: string): void;
export function logError(data: Error | any): void;


// Text
export function formatUppercase(string: string): string;
export function formatNumber(num: number): string;
export function createTicket(overwriteLimit?: number): string;

export type LogType = "warning" | "alert" | "info" | "success" | "none" | "fatal" | "error";
export type FormattedDate = { date: string; time: string; today: Date, fullDate: string };
export type DateDifference = { hours: number; minutes: number };
export type DatetimeOptions = { dateSeparator?: string; timeSeparator?: string };