import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/lib/firebase';

// API Base URL - defaults to FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 - Token expired
        if (error.response?.status === 401 && originalRequest) {
            try {
                const user = auth.currentUser;
                if (user) {
                    // Force refresh the token
                    const newToken = await user.getIdToken(true);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Redirect to login or handle logout
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        // Format error response
        const errorMessage =
            (error.response?.data as { message?: string })?.message ||
            error.message ||
            'An unexpected error occurred';

        return Promise.reject({
            code: error.response?.status || 'NETWORK_ERROR',
            message: errorMessage,
            originalError: error,
        });
    }
);

// API helper functions
export const api = {
    get: <T>(url: string, config = {}) =>
        apiClient.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data = {}, config = {}) =>
        apiClient.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data = {}, config = {}) =>
        apiClient.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data = {}, config = {}) =>
        apiClient.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config = {}) =>
        apiClient.delete<T>(url, config).then((res) => res.data),
};

// Health check
export const checkHealth = () => api.get<{ status: string }>('/health');

// User API
export const userApi = {
    getProfile: () => api.get('/api/v1/users/me'),
    updateProfile: (data: Record<string, unknown>) => api.patch('/api/v1/users/me', data),
    deleteAccount: () => api.delete('/api/v1/users/me'),
};

// Journal API
export const journalApi = {
    getEntries: (params?: { page?: number; limit?: number }) =>
        api.get('/api/v1/journal', { params }),
    getEntry: (id: string) => api.get(`/api/v1/journal/${id}`),
    createEntry: (data: { content: string; mood?: string }) =>
        api.post('/api/v1/journal', data),
    updateEntry: (id: string, data: Partial<{ content: string; mood?: string }>) =>
        api.patch(`/api/v1/journal/${id}`, data),
    deleteEntry: (id: string) => api.delete(`/api/v1/journal/${id}`),
};

// Goals API
export const goalsApi = {
    getGoals: () => api.get('/api/v1/goals'),
    getGoal: (id: string) => api.get(`/api/v1/goals/${id}`),
    createGoal: (data: Record<string, unknown>) => api.post('/api/v1/goals', data),
    updateGoal: (id: string, data: Record<string, unknown>) =>
        api.patch(`/api/v1/goals/${id}`, data),
    deleteGoal: (id: string) => api.delete(`/api/v1/goals/${id}`),
};

// Mood API
export const moodApi = {
    getMoods: (params?: { startDate?: string; endDate?: string }) =>
        api.get('/api/v1/moods', { params }),
    logMood: (data: { mood: string; score: number; note?: string }) =>
        api.post('/api/v1/moods', data),
};

export default api;
