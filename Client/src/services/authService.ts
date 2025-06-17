import api from '../config/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  tokenBalance?: number;
  adoptedTrees?: any[];
  orders?: any[];
}

export interface AuthResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
    tokenBalance: {
      balance: number;
      transactions: any[];
    };
  };
}

const authService = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<AuthResponse> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export default authService; 