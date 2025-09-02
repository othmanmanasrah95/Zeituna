import api from '../config/api';

export interface DiscountCode {
  _id: string;
  code: string;
  percentage: number;
  user: string;
  tutAmount?: number;
  status: 'active' | 'used' | 'expired' | 'cancelled';
  usedAt?: string;
  expiresAt: string;
  usedBy?: string;
  order?: string;
  maxUsage: number;
  currentUsage: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscountValidation {
  code: string;
  percentage: number;
  discountAmount: number;
  finalAmount: number;
  description: string;
  expiresAt: string;
}

export interface DiscountStats {
  _id: string;
  count: number;
  totalDiscount: number;
}

class DiscountService {
  // Generate discount code for TUT redemption
  async generateDiscountForRedemption(tutAmount: number, userId: string): Promise<DiscountCode> {
    const response = await api.post('/discounts/generate', {
      tutAmount,
      userId
    });
    return response.data.data;
  }

  // Get user's discount codes
  async getUserDiscounts(status?: string, page: number = 1, limit: number = 10): Promise<{
    discounts: DiscountCode[];
    pagination: {
      current: number;
      pages: number;
      total: number;
    };
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await api.get(`/discounts/my-discounts?${params}`);
    return response.data.data;
  }

  // Validate discount code
  async validateDiscountCode(code: string, orderAmount: number): Promise<DiscountValidation> {
    const response = await api.post('/discounts/validate', {
      code,
      orderAmount
    });
    return response.data.data;
  }

  // Apply discount code
  async applyDiscountCode(code: string, orderAmount: number, orderId: string): Promise<{
    code: string;
    percentage: number;
    discountAmount: number;
    finalAmount: number;
  }> {
    const response = await api.post('/discounts/apply', {
      code,
      orderAmount,
      orderId
    });
    return response.data.data;
  }

  // Admin: Get all discount codes
  async getAllDiscounts(
    status?: string,
    page: number = 1,
    limit: number = 20,
    search?: string
  ): Promise<{
    discounts: DiscountCode[];
    pagination: {
      current: number;
      pages: number;
      total: number;
    };
    stats: DiscountStats[];
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (status) {
      params.append('status', status);
    }
    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/discounts/admin/all?${params}`);
    return response.data.data;
  }

  // Admin: Create manual discount code
  async createDiscountCode(discountData: {
    code: string;
    percentage: number;
    userId: string;
    maxUsage?: number;
    expiresAt?: string;
    minOrderAmount?: number;
    maxDiscountAmount?: number;
    description?: string;
  }): Promise<DiscountCode> {
    const response = await api.post('/discounts/admin/create', discountData);
    return response.data.data;
  }

  // Admin: Update discount code
  async updateDiscountCode(id: string, updates: Partial<DiscountCode>): Promise<DiscountCode> {
    const response = await api.put(`/discounts/admin/${id}`, updates);
    return response.data.data;
  }

  // Admin: Delete discount code
  async deleteDiscountCode(id: string): Promise<void> {
    await api.delete(`/discounts/admin/${id}`);
  }

  // Calculate discount percentage from TUT amount
  static calculateDiscountPercentage(tutAmount: number): number {
    // 1% for every 100 TUT, maximum 50%
    const percentage = Math.floor(tutAmount / 100);
    return Math.min(percentage, 50);
  }

  // Format discount code for display
  static formatDiscountCode(code: string): string {
    return code.toUpperCase();
  }

  // Check if discount is expired
  static isExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
  }

  // Get discount status color
  static getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'used':
        return 'text-blue-600 bg-blue-100';
      case 'expired':
        return 'text-gray-600 bg-gray-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  // Get discount status text
  static getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'used':
        return 'Used';
      case 'expired':
        return 'Expired';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}

// Create a singleton instance
const discountService = new DiscountService();

export default discountService;
