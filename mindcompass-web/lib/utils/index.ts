import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles class conflicts and conditional classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 */
export function formatDate(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
): string {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text to a specified length
 */
export function truncate(str: string, length: number): string {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

/**
 * Generate a random ID
 */
export function generateId(prefix: string = ''): string {
    const random = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}_${random}` : random;
}

/**
 * Delay execution for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if code is running on the client side
 */
export function isClient(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Check if code is running on the server side
 */
export function isServer(): boolean {
    return typeof window === 'undefined';
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json) as T;
    } catch {
        return fallback;
    }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
