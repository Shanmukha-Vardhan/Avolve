// User related types
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserProfile extends User {
    bio?: string;
    goals?: string[];
    preferences?: UserPreferences;
    streak?: number;
    totalEntries?: number;
    lastActiveAt?: Date;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    notifications: {
        email: boolean;
        push: boolean;
        reminders: boolean;
    };
    dailyReminderTime?: string;
    language: string;
}

// Journal/Entry related types
export interface JournalEntry {
    id: string;
    userId: string;
    title?: string;
    content: string;
    mood?: MoodType;
    moodScore?: number;
    tags?: string[];
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type MoodType =
    | 'excited'
    | 'happy'
    | 'calm'
    | 'neutral'
    | 'anxious'
    | 'sad'
    | 'stressed'
    | 'angry';

export interface MoodEntry {
    id: string;
    userId: string;
    mood: MoodType;
    score: number; // 1-10
    note?: string;
    factors?: string[];
    createdAt: Date;
}

// Goal related types
export interface Goal {
    id: string;
    userId: string;
    title: string;
    description?: string;
    category: GoalCategory;
    targetDate?: Date;
    progress: number; // 0-100
    milestones?: Milestone[];
    status: GoalStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type GoalCategory =
    | 'health'
    | 'career'
    | 'relationships'
    | 'personal'
    | 'financial'
    | 'education'
    | 'mindfulness';

export type GoalStatus = 'active' | 'completed' | 'paused' | 'abandoned';

export interface Milestone {
    id: string;
    title: string;
    isCompleted: boolean;
    completedAt?: Date;
}

// API related types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// Form related types
export interface FormField<T = string> {
    value: T;
    error?: string;
    touched: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
    acceptTerms: boolean;
}

// Navigation types
export interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    isExternal?: boolean;
    children?: NavItem[];
}

// Component prop types
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
