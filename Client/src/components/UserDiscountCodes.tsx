import React, { useState, useEffect } from 'react';
import { Tag, Copy, Calendar, Percent, Gift, RefreshCw, AlertCircle } from 'lucide-react';
import discountService, { DiscountCode } from '../services/discountService';

interface UserDiscountCodesProps {
  className?: string;
}

export default function UserDiscountCodes({ className = '' }: UserDiscountCodesProps) {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'active' | 'used' | 'expired'>('active');

  useEffect(() => {
    loadDiscounts();
  }, [activeTab]);

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await discountService.getUserDiscounts(activeTab);
      setDiscounts(result.discounts);
    } catch (err: any) {
      setError(err.message || 'Failed to load discount codes');
    } finally {
      setLoading(false);
    }
  };

  const copyDiscountCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setSuccess('Discount code copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'used':
        return 'Used';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTabCounts = () => {
    const active = discounts.filter(d => d.status === 'active').length;
    const used = discounts.filter(d => d.status === 'used').length;
    const expired = discounts.filter(d => d.status === 'expired').length;
    return { active, used, expired };
  };

  const tabCounts = getTabCounts();

  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Tag className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">My Discount Codes</h3>
            <p className="text-sm text-gray-600">Manage your TUT redemption discount codes</p>
          </div>
        </div>
        <button
          onClick={loadDiscounts}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          title="Refresh discount codes"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-green-600">
            <Gift className="w-4 h-4" />
            <span className="text-sm font-medium">{success}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active ({tabCounts.active})
        </button>
        <button
          onClick={() => setActiveTab('used')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'used'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Used ({tabCounts.used})
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'expired'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Expired ({tabCounts.expired})
        </button>
      </div>

      {/* Discount Codes List */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : discounts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} discount codes</h4>
          <p className="text-gray-600 mb-4">
            {activeTab === 'active' 
              ? "You don't have any active discount codes. Redeem TUT tokens to generate discount codes!"
              : `You don't have any ${activeTab} discount codes.`
            }
          </p>
          {activeTab === 'active' && (
            <div className="text-sm text-gray-500">
              <p>💡 Tip: Redeem 100+ TUT tokens to get discount codes</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {discounts.map((discount) => (
            <div key={discount._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-purple-600 font-mono">
                      {discount.code}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(discount.status)}`}>
                      {getStatusText(discount.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Percent className="w-4 h-4" />
                      <span>{discount.percentage}% discount</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Expires: {formatDate(discount.expiresAt)}</span>
                    </div>
                    
                    {discount.tutAmount && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Gift className="w-4 h-4" />
                        <span>From {discount.tutAmount} TUT</span>
                      </div>
                    )}
                  </div>
                  
                  {discount.description && (
                    <p className="text-sm text-gray-500 mt-2">{discount.description}</p>
                  )}
                  
                  {discount.minOrderAmount && (
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum order: ${discount.minOrderAmount}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => copyDiscountCode(discount.code)}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    title="Copy discount code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">How to get discount codes:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Redeem 100+ TUT tokens to generate discount codes</li>
          <li>• Get 1% discount for every 100 TUT redeemed (max 50%)</li>
          <li>• Discount codes expire after 30 days</li>
          <li>• Use codes at checkout for instant savings</li>
        </ul>
      </div>
    </div>
  );
}
