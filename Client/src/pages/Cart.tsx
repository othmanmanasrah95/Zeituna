import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Leaf, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  const handleProceedToCheckout = () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Discover sustainable products and adopt trees to make a positive impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/trees"
              className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Adopt a Tree
              <Leaf className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {item.type === 'tree' && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <TreePine className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.type === 'tree' ? 'Tree Adoption' : 'Product'}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg font-bold text-green-600">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.type === 'tree' && (
                        <span className="ml-2 text-sm text-gray-500">one-time fee</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.type === 'product' && (
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {item.type === 'tree' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center text-green-800 text-sm">
                      <Leaf className="w-4 h-4 mr-2" />
                      <span>
                        This adoption includes a certificate, GPS coordinates, and lifetime updates
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({itemCount})</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-green-600">
                      ${(total * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mb-4"
              >
                Proceed to Checkout
              </button>

              <div className="text-center">
                <Link
                  to="/marketplace"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Environmental Impact */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Environmental Impact</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex justify-between">
                    <span>Trees being adopted:</span>
                    <span className="font-medium">
                      {items.filter(item => item.type === 'tree').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated CO₂ offset:</span>
                    <span className="font-medium">
                      {items.filter(item => item.type === 'tree').length * 25}kg/year
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sustainable products:</span>
                    <span className="font-medium">
                      {items.filter(item => item.type === 'product').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security & Trust */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>30-day satisfaction guarantee</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Carbon-neutral shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}