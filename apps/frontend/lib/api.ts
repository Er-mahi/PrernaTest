import { 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  GoogleAuthResponse
} from '@/types/auth';
import { Test, TestAttempt, TestResult } from '@/types/test';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      credentials: "include", // ✅ send cookies automatically
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "Network error occurred");
    }
  }

  // Auth endpoints
  auth = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      return this.request("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      return this.request("/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    logout: async (): Promise<void> => {
      return this.request("/auth/logout", { method: "POST" });
    },

    me: async (): Promise<User> => {
      return this.request("/auth/me");
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
      return this.request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
      return this.request("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
      return this.request("/auth/change-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    googleAuth: async (token: string): Promise<GoogleAuthResponse> => {
      return this.request("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
    },
  };




  // Test endpoints
  tests = {
    getAll: async (params?: {
      category?: string;
      difficulty?: string;
      subject?: string;
      page?: number;
      limit?: number;
    }): Promise<{ tests: Test[]; total: number; page: number; totalPages: number }> => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      
      return this.request(`/tests?${searchParams}`);
    },

    getById: async (id: string): Promise<Test> => {
      return this.request(`/tests/${id}`);
    },

    startAttempt: async (testId: string): Promise<{ attempt: TestAttempt; resumed: boolean }> => {
      return this.request(`/attempts/${testId}/start`, { method: "POST" });
    },


  getAttempt: async (attemptId: string): Promise<TestAttempt> => {
  const res = await this.request<any>(`/attempts/${attemptId}`);
  console.log("getAttempt response", res); // 👀 Debug

  // if backend sends { attempt: {...}, userAnswers: {...} }
  if (res.attempt) {
    return res.attempt;
  }

  // if backend sends directly attempt object
  return res;
},



    updateAnswer: async (
      attemptId: string, 
      questionIndex: number, 
      answerIndex: number | null
    ): Promise<void> => {
      return this.request(`/attempts/${attemptId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ questionIndex, answerIndex }),
      });
    },

    submitTest: async (attemptId: string): Promise<TestResult> => {
      return this.request(`/attempts/${attemptId}/submit`, {
        method: 'POST',
      });
    },

    getResults: async (userId?: string): Promise<TestResult[]> => {
      const endpoint = userId ? `/results?userId=${userId}` : '/results';
      return this.request(endpoint);
    },

    getResult: async (resultId: string): Promise<TestResult> => {
      return this.request(`/results/${resultId}`);
    },
  };

  // User endpoints
  users = {
    updateProfile: async (data: Partial<User>): Promise<User> => {
      return this.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
      const formData = new FormData();
      formData.append('avatar', file);
      
      return this.request('/users/avatar', {
        method: 'POST',
        headers: {}, // Remove content-type to let browser set it for FormData
        body: formData,
      });
    },

    getStats: async (): Promise<User['stats']> => {
      return this.request('/users/stats');
    },

    updatePreferences: async (preferences: User['preferences']): Promise<User> => {
      return this.request('/users/preferences', {
        method: 'PUT',
        body: JSON.stringify(preferences),
      });
    },
  };

  // Payment endpoints
  payments = {
    createOrder: async (planId: string): Promise<{ orderId: string; amount: number }> => {
      return this.request('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ planId }),
      });
    },

    verifyPayment: async (paymentData: {
      orderId: string;
      paymentId: string;
      signature: string;
    }): Promise<{ success: boolean }> => {
      return this.request('/payments/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    },

    getSubscription: async (): Promise<User['subscription']> => {
      return this.request('/payments/subscription');
    },

    cancelSubscription: async (): Promise<{ message: string }> => {
      return this.request('/payments/cancel', {
        method: 'POST',
      });
    },
  };
}

export const api = new ApiClient(API_BASE_URL);
export { ApiError };