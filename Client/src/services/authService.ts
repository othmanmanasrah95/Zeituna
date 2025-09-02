import api from '../config/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  walletAddress?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  walletAddress?: string;
  walletConnected?: boolean;
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
    walletAddress?: string;
    walletConnected?: boolean;
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
  updateProfile: async (data: Partial<User> & { password?: string; currentPassword?: string }): Promise<AuthResponse> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  // Connect wallet to user account
  connectWallet: async (walletAddress: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/connect-wallet', { walletAddress });
    return response.data;
  },

  // Disconnect wallet from user account
  disconnectWallet: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/disconnect-wallet');
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export default authService; 