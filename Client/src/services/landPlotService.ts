import api from '../config/api';

export interface LandPlot {
  _id: string;
  name: string;
  location: string;
  description: string;
  totalTrees: number;
  adoptedTrees: number;
  availableTrees: number;
  adoptionProgress: number;
  adoptionPrice: number;
  images: string[];
  benefits: string[];
  plotSize: string;
  soilType: string;
  climate: string;
  farmer: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'Available' | 'Fully Adopted' | 'Maintenance';
  adoptions: Adoption[];
  estimatedCO2Absorption: string;
  updates: LandPlotUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface Adoption {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  treeNumber: number;
  adoptedAt: string;
  expiresAt: string;
  status: 'Active' | 'Expired' | 'Cancelled';
}

export interface LandPlotUpdate {
  _id: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  type: 'Growth' | 'Maintenance' | 'Harvest' | 'General';
}

export interface LandPlotResponse {
  success: boolean;
  data: LandPlot;
}

export interface LandPlotsResponse {
  success: boolean;
  count: number;
  data: LandPlot[];
}

export interface AdoptionResponse {
  success: boolean;
  data: {
    landPlot: LandPlot;
    adoption: Adoption;
    treeNumber: number;
  };
}

const landPlotService = {
  // Get all land plots
  getLandPlots: async (params?: {
    status?: string;
    sort?: string;
  }): Promise<LandPlotsResponse> => {
    const response = await api.get('/land-plots', { params });
    return response.data;
  },

  // Get single land plot
  getLandPlot: async (id: string): Promise<LandPlotResponse> => {
    const response = await api.get(`/land-plots/${id}`);
    return response.data;
  },

  // Create land plot (admin only)
  createLandPlot: async (data: Partial<LandPlot>): Promise<LandPlotResponse> => {
    const response = await api.post('/admin/land-plots', data);
    return response.data;
  },

  // Update land plot (admin only)
  updateLandPlot: async (id: string, data: Partial<LandPlot>): Promise<LandPlotResponse> => {
    const response = await api.put(`/admin/land-plots/${id}`, data);
    return response.data;
  },

  // Delete land plot (admin only)
  deleteLandPlot: async (id: string): Promise<{ success: boolean; data: {} }> => {
    const response = await api.delete(`/admin/land-plots/${id}`);
    return response.data;
  },

  // Adopt a tree in land plot
  adoptTree: async (id: string, paymentMethod: string): Promise<AdoptionResponse> => {
    const response = await api.post(`/land-plots/${id}/adopt`, { paymentMethod });
    return response.data;
  },

  // Get user's adopted trees
  getMyAdoptions: async (): Promise<LandPlotsResponse> => {
    const response = await api.get('/land-plots/my-adoptions');
    return response.data;
  }
};

export default landPlotService;
