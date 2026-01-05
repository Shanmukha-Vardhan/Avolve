'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/firebase';

/**
 * Hook to manage authentication state
 */
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            setUser(firebaseUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, isLoading, error, isAuthenticated: !!user };
}

/**
 * Hook to manage local storage state
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
}

/**
 * Hook to manage theme
 */
export function useTheme() {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system');

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.setAttribute('data-theme', systemTheme);
        } else {
            root.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(current => current === 'dark' ? 'light' : 'dark');
    }, [setTheme]);

    return { theme, setTheme, toggleTheme };
}

/**
 * Hook to detect click outside an element
 */
export function useClickOutside<T extends HTMLElement>(
    callback: () => void
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [callback]);

    return ref;
}

/**
 * Hook to detect keyboard shortcuts
 */
export function useKeyboardShortcut(
    key: string,
    callback: () => void,
    modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean } = {}
) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const matchesKey = event.key.toLowerCase() === key.toLowerCase();
            const matchesCtrl = modifiers.ctrl ? event.ctrlKey : true;
            const matchesShift = modifiers.shift ? event.shiftKey : true;
            const matchesAlt = modifiers.alt ? event.altKey : true;
            const matchesMeta = modifiers.meta ? event.metaKey : true;

            if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
                event.preventDefault();
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [key, callback, modifiers]);
}

/**
 * Hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook for window size
 */
export function useWindowSize() {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

/**
 * Hook for media queries
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}

/**
 * Hook for mobile detection
 */
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 768px)');
}
