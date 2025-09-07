import React, { useState } from 'react';
import { Clock, ShoppingBag, Users, Leaf, Star, ArrowRight, Mail, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Marketplace() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const features = [
    {
      icon: ShoppingBag,
      title: 'Local Artisans',
      description: 'Discover unique products from talented local craftspeople and artisans in Palestine and the region.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Every product is carefully vetted for sustainability and environmental impact.'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Support local communities with every purchase, creating meaningful economic opportunities.'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'All products meet our high standards for quality, authenticity, and ethical production.'
    }
  ];

  const upcomingCategories = [
    'Traditional Olive Oil & Products',
    'Handcrafted Pottery & Ceramics',
    'Natural Skincare & Cosmetics',
    'Sustainable Fashion & Textiles',
    'Organic Food & Beverages',
    'Artisan Jewelry & Accessories',
    'Home Decor & Furnishings',
    'Books & Cultural Items'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Header */}
        <div className="relative mb-16 flex flex-col items-center text-center">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-300 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-tight">
              Sustainable Marketplace
            </h1>
            
            <p className="text-xl md:text-2xl text-green-900 max-w-3xl mx-auto font-medium mb-8 leading-relaxed">
              Discover authentic products from local artisans, support sustainable practices, 
              and make a positive impact with every purchase.
            </p>

            {/* Notify Me Form */}
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <div className="bg-green-100 border border-green-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Bell className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">You're on the list!</span>
                  </div>
                  <p className="text-green-700 text-sm">We'll notify you when the marketplace launches.</p>
                </div>
              ) : (
                <form onSubmit={handleNotifyMe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Notify Me</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our marketplace is built on principles of sustainability, community impact, and authentic craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-lg border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Categories */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Can Expect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're curating an amazing collection of products from talented artisans and sustainable brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                className="bg-white/50 backdrop-blur-sm border border-green-100 rounded-lg p-4 hover:bg-white/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of conscious consumers and be the first to know when we launch. 
            Together, we can create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/roots'}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Leaf className="w-5 h-5" />
              <span>Explore Tree Adoption</span>
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Get in Touch</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}