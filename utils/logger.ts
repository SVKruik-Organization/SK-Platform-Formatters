import { appendFile, existsSync, mkdirSync } from "fs";
import { formatDate } from "./datetime";
import { FormattedDate, LogType } from "../types";
import { resolve } from "path";

/**
 * Log messages to the log file.
 * 
 * @param data The data to log to the file.
 * @param type The type of message.
 */
export function logData(data: string, type: LogType): void {
    let payload: string;
    if (type === "none") {
        payload = `${data}\n`;
    } else payload = `${formatDate(null, null).time} [${type.toUpperCase()}] ${data}\n`;

    console.log(payload);
    write(payload);
}

/**
 * Log error messages to the log file.
 * 
 * @param data The error to write to the file.
 */
export function logError(data: Error | any): void {
    const payload: string = `${formatDate(null, null).time} [ERROR] ${typeof data === "string" ? data : data.stack}\n`;
    console.log(payload);
    write(payload);
}

/**
 * The writing to the log file itself.
 * 
 * @param data The text to write to the file.
 */
function write(data: string): void {
    const date: FormattedDate = formatDate(null, null);
    const logsDir: string = resolve(process.cwd(), "logs");

    if (!existsSync(logsDir)) mkdirSync(logsDir);
    appendFile(`${logsDir}/${date.date}.log`, data, (error: any) => {
        if (error) console.error(`${date.time} [ERROR] Error appending to log file.`);
    });
}
