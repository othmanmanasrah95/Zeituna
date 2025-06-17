import api from '../config/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'organic' | 'handmade' | 'eco-friendly' | 'local';
  rating: number;
  reviews: Review[];
  inStock: boolean;
  featured: boolean;
  seller: {
    _id: string;
    name: string;
  };
}

export interface Review {
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface ReviewData {
  rating: number;
  comment: string;
}

const productService = {
  // Get all products
  getProducts: async (params?: {
    category?: string;
    featured?: boolean;
    sort?: string;
  }): Promise<ProductsResponse> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id: string): Promise<ProductResponse> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (data: Partial<Product>): Promise<ProductResponse> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  // Update product
  updateProduct: async (id: string, data: Partial<Product>): Promise<ProductResponse> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<{ success: boolean; data: {} }> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Add product review
  addReview: async (id: string, data: ReviewData): Promise<ProductResponse> => {
    const response = await api.post(`/products/${id}/reviews`, data);
    return response.data;
  }
};

export default productService; 