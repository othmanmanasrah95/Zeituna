import api from '../config/api';

export interface Tree {
  _id: string;
  name: string;
  species: string;
  location: string;
  plantedDate: string;
  height: string;
  co2Absorbed: string;
  adoptionPrice: number;
  images: string[];
  description: string;
  benefits: string[];
  adopters: {
    _id: string;
    name: string;
  }[];
  maxAdopters: number;
  farmer: {
    _id: string;
    name: string;
  };
  status: 'Available' | 'Fully Adopted';
  updates: TreeUpdate[];
}

export interface TreeUpdate {
  date: string;
  title: string;
  content: string;
  image: string;
}

export interface TreeResponse {
  success: boolean;
  data: Tree;
}

export interface TreesResponse {
  success: boolean;
  count: number;
  data: Tree[];
}

export interface AdoptionResponse {
  success: boolean;
  data: {
    tree: Tree;
    transaction: {
      _id: string;
      totalAmount: number;
      tokenReward: number;
      status: string;
    };
  };
}

export interface UpdateData {
  title: string;
  content: string;
  image: string;
}

const treeService = {
  // Get all trees
  getTrees: async (params?: {
    status?: string;
    sort?: string;
  }): Promise<TreesResponse> => {
    const response = await api.get('/trees', { params });
    return response.data;
  },

  // Get single tree
  getTree: async (id: string): Promise<TreeResponse> => {
    const response = await api.get(`/trees/${id}`);
    return response.data;
  },

  // Create tree
  createTree: async (data: Partial<Tree>): Promise<TreeResponse> => {
    const response = await api.post('/trees', data);
    return response.data;
  },

  // Update tree
  updateTree: async (id: string, data: Partial<Tree>): Promise<TreeResponse> => {
    const response = await api.put(`/trees/${id}`, data);
    return response.data;
  },

  // Delete tree
  deleteTree: async (id: string): Promise<{ success: boolean; data: {} }> => {
    const response = await api.delete(`/trees/${id}`);
    return response.data;
  },

  // Adopt tree
  adoptTree: async (id: string, paymentMethod: string): Promise<AdoptionResponse> => {
    const response = await api.post(`/trees/${id}/adopt`, { paymentMethod });
    return response.data;
  },

  // Add tree update
  addUpdate: async (id: string, data: UpdateData): Promise<TreeResponse> => {
    const response = await api.post(`/trees/${id}/updates`, data);
    return response.data;
  }
};

export default treeService; 