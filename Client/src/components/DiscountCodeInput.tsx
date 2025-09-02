import React, { useState } from 'react';
import { Tag, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import discountService, { DiscountValidation } from '../services/discountService';

interface DiscountCodeInputProps {
  orderAmount: number;
  onDiscountApplied: (discount: DiscountValidation) => void;
  onDiscountRemoved: () => void;
  className?: string;
}

export default function DiscountCodeInput({ 
  orderAmount, 
  onDiscountApplied, 
  onDiscountRemoved,
  className = '' 
}: DiscountCodeInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountValidation | null>(null);

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter a discount code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const discount = await discountService.validateDiscountCode(code.trim(), orderAmount);
      setAppliedDiscount(discount);
      onDiscountApplied(discount);
      setCode('');
    } catch (err: any) {
      setError(err.message || 'Invalid discount code');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    onDiscountRemoved();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Applied Discount Display */}
      {appliedDiscount && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">
                  Discount Applied: {appliedDiscount.code}
                </p>
                <p className="text-sm text-green-700">
                  {appliedDiscount.percentage}% off • Save ${appliedDiscount.discountAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveDiscount}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Discount Code Input */}
      {!appliedDiscount && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Discount Code</h3>
              <p className="text-sm text-gray-600">Enter your discount code to save money</p>
            </div>
          </div>

          <form onSubmit={handleApplyDiscount} className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter discount code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Applying...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
