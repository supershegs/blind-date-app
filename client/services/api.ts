import { z } from 'zod';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

// Response schemas
const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
});

const LoginResponseSchema = ApiResponseSchema.extend({
  token: z.string().optional(),
  user: UserSchema.optional(),
});

const RegisterResponseSchema = ApiResponseSchema.extend({
  user: UserSchema.optional(),
});

const ProfileResponseSchema = ApiResponseSchema.extend({
  profile: z.object({}).optional(),
});

// Request schemas
const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const RegisterRequestSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin']).default('user'),
});

const ProfileRequestSchema = z.object({
  lastname: z.string().min(1).max(50),
  firstname: z.string().min(1).max(50),
  middlename: z.string().max(50).optional(),
  dob: z.string().optional(),
  phoneNum: z.string().max(20).optional(),
  sex: z.string().max(10).optional(),
  address: z.string().min(1).max(200),
  state: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  localGovt: z.string().min(1).max(50),
  bio: z.string().max(500).optional(),
  interest: z.string().max(200).optional(),
  heightFt: z.string().optional(),
  weightKg: z.string().optional(),
  complexion: z.string().max(50).optional(),
  hobbies: z.string().max(200).optional()
});

// Types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type ProfileRequest = z.infer<typeof ProfileRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(response.status, data.message || 'Request failed');
      }

      if (schema) {
        return schema.parse(data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred');
    }
  }

  private async requestFormData<T>(
    endpoint: string,
    formData: FormData, 
    method: string = 'POST',
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      method: method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(response.status, data.message || 'Request failed');
      }

      if (schema) {
        return schema.parse(data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred');
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const validatedCredentials = LoginRequestSchema.parse(credentials);
    
    const response = await this.request<LoginResponse>(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify(validatedCredentials),
      },
      LoginResponseSchema
    );

    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const validatedUserData = RegisterRequestSchema.parse(userData);
    
    return this.request<RegisterResponse>(
      '/register',
      {
        method: 'POST',
        body: JSON.stringify(validatedUserData),
      },
      RegisterResponseSchema
    );
  }

  async createUserProfile(userId: number, profileData: ProfileRequest, imageFile?: File): Promise<ProfileResponse> {
    const validatedData = ProfileRequestSchema.parse(profileData);
    
    const formData = new FormData();
    
    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    if (imageFile) {
      formData.append('imageUpload', imageFile);
    }

    return this.requestFormData<ProfileResponse>(
      `/user/${userId}/profile`,
      formData,
      'POST',
      ProfileResponseSchema
    );
  }

  async getUserProfile(userId: number): Promise<any> {
    return this.request(`/user/${userId}/profile`);
  }

  async findMatches(userId: number): Promise<any> {
    return this.request(`/user/${userId}/matches`);
  }

  async sendConnection(userId: number, receiverId: number): Promise<any> {
    return this.request(`/user/${userId}/connections`, {
      method: 'POST',
      body: JSON.stringify({ receiverId }),
    });
  }

  async getConnectionStatus(userId: number): Promise<any> {
    return this.request(`/user/${userId}/connections/status`);
  }

  async acceptConnection(userId: number, connectionId: number): Promise<any> {
    return this.request(`/user/${userId}/connections/accept`, {
      method: 'PUT',
      body: JSON.stringify({ connectionId }),
    });
  }

  async disconnect(userId: number, connectionId: number): Promise<any> {
    return this.request(`/user/${userId}/connections`, {
      method: 'DELETE',
      body: JSON.stringify({ connectionId }),
    });
  }

  // Messaging APIs
  async getConversation(partnerUserId: number): Promise<any> {
    return this.request(`/user/${partnerUserId}/messages`);
  }

  async getConversations(): Promise<any> {
    return this.request(`/user/conversations`);
  }

  async getUnreadCount(): Promise<any> {
    return this.request(`/messages/unread-count`);
  }

  async sendMessage(receiverId: number, content: string): Promise<any> {
    return this.request(`/messages`, {
      method: 'POST',
      body: JSON.stringify({ receiverId, content }),
    });
  }

  // Date planning APIs
  async getCurrentDatePlan(): Promise<any> {
    return this.request(`/date-plan/current`);
  }

  async proposeDate(dateTime: string, location: string, notes?: string): Promise<any> {
    return this.request(`/date-plan`, {
      method: 'POST',
      body: JSON.stringify({ dateTime, location, notes })
    });
  }

  async acceptDatePlan(id: number): Promise<any> {
    return this.request(`/date-plan/${id}/accept`, { method: 'PUT' });
  }

  async declineDatePlan(id: number): Promise<any> {
    return this.request(`/date-plan/${id}/decline`, { method: 'PUT' });
  }

  async cancelDatePlan(id: number): Promise<any> {
    return this.request(`/date-plan/${id}`, { method: 'DELETE' });
  }


   async updateUserProfile(userId: number, profileData: ProfileRequest, imageFile?: File): Promise<ProfileResponse> {
      const validatedData = ProfileRequestSchema.parse(profileData);
      
      const formData = new FormData();
      
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });

      if (imageFile) {
        formData.append('imageUpload', imageFile);
      }

      return this.requestFormData<ProfileResponse>(
        `/user/${userId}/profile`,
        formData,
        'PUT',
        ProfileResponseSchema
      );
    }
  

  getCurrentUser(): any {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const apiService = new ApiService();
export { ApiError };
