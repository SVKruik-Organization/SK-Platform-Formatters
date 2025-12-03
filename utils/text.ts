/**
 * Uppercases the first letter of a string.
 * 
 * @param string The string to format
 * @returns Formatted string
 */
export function formatUppercase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Formats a number into a more readable format (e.g., 1K, 1M).
 *
 * @param num The number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
    } else {
        return num.toString();
    }
}

/**
 * Generate a random string.
 * Can be used for file names, ticket codes, etc.
 * 
 * @param overwriteLimit Optional length of the ticket. Default is 8.
 * @return The random generated ticket.
 */
export function createTicket(overwriteLimit?: number): string {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ticket: string = "";

    for (let i = 0; i < (overwriteLimit || 8); i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        ticket += characters.charAt(randomIndex);
    }

    return ticket;
}
