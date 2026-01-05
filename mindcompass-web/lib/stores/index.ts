'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

// ============ Auth Store ============
interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));

// ============ UI Store ============
interface UIState {
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
    isModalOpen: boolean;
    modalContent: React.ReactNode | null;
    theme: 'light' | 'dark' | 'system';
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            isSidebarOpen: true,
            isMobileMenuOpen: false,
            isModalOpen: false,
            modalContent: null,
            theme: 'system',
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (open) => set({ isSidebarOpen: open }),
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
            openModal: (content) => set({ isModalOpen: true, modalContent: content }),
            closeModal: () => set({ isModalOpen: false, modalContent: null }),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'ui-storage',
            partialize: (state) => ({ theme: state.theme, isSidebarOpen: state.isSidebarOpen }),
        }
    )
);

// ============ Notification Store ============
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
    clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    addNotification: (notification) =>
        set((state) => ({
            notifications: [
                ...state.notifications,
                { ...notification, id: `${Date.now()}-${Math.random()}` },
            ],
        })),
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
    clearAllNotifications: () => set({ notifications: [] }),
}));

// ============ Journal Store ============
interface JournalEntry {
    id: string;
    content: string;
    mood?: string;
    createdAt: Date;
}

interface JournalState {
    entries: JournalEntry[];
    currentDraft: string;
    isLoading: boolean;
    setEntries: (entries: JournalEntry[]) => void;
    addEntry: (entry: JournalEntry) => void;
    updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
    deleteEntry: (id: string) => void;
    setDraft: (draft: string) => void;
    clearDraft: () => void;
    setLoading: (loading: boolean) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
    entries: [],
    currentDraft: '',
    isLoading: false,
    setEntries: (entries) => set({ entries }),
    addEntry: (entry) =>
        set((state) => ({ entries: [entry, ...state.entries] })),
    updateEntry: (id, updates) =>
        set((state) => ({
            entries: state.entries.map((e) =>
                e.id === id ? { ...e, ...updates } : e
            ),
        })),
    deleteEntry: (id) =>
        set((state) => ({
            entries: state.entries.filter((e) => e.id !== id),
        })),
    setDraft: (draft) => set({ currentDraft: draft }),
    clearDraft: () => set({ currentDraft: '' }),
    setLoading: (loading) => set({ isLoading: loading }),
}));
