import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  inStock: boolean;
  featured: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Extra Virgin Olive Oil',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.8,
    reviews: 156,
    category: 'organic',
    description: 'Premium cold-pressed olive oil from local organic farms',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Handwoven Natural Fiber Basket',
    price: 45.00,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.9,
    reviews: 89,
    category: 'handmade',
    description: 'Beautiful handcrafted basket made from sustainable materials',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Eco-Friendly Soap Gift Set',
    price: 18.50,
    originalPrice: 22.00,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.7,
    reviews: 203,
    category: 'eco-friendly',
    description: 'Natural soap set with essential oils and organic ingredients',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Bamboo Kitchen Utensil Set',
    price: 32.99,
    image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.6,
    reviews: 127,
    category: 'eco-friendly',
    description: 'Complete bamboo kitchen utensil set for sustainable cooking',
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Local Honey Collection',
    price: 28.00,
    image: 'https://images.pexels.com/photos/1463039/pexels-photo-1463039.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.9,
    reviews: 94,
    category: 'local',
    description: 'Pure raw honey from local beekeepers supporting biodiversity',
    inStock: false,
    featured: true
  },
  {
    id: '6',
    name: 'Ceramic Plant Pot Set',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.5,
    reviews: 71,
    category: 'handmade',
    description: 'Handcrafted ceramic pots perfect for your indoor garden',
    inStock: true,
    featured: false
  }
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'newest', name: 'Newest' }
];

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [productType, setProductType] = useState<'olive' | 'handcrafts'>('olive');

  const searchQuery = searchParams.get('search') || '';

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Product type filter
      if (productType === 'olive' && !product.name.toLowerCase().includes('olive oil')) {
        return false;
      }
      if (productType === 'handcrafts' && product.name.toLowerCase().includes('olive oil')) {
        return false;
      }
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, productType]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Glow */}
        <div className="relative mb-12 flex flex-col items-center text-center">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-300 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
          <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Marketplace'}
          </h1>
          <p className="relative z-10 text-xl text-green-900 max-w-2xl mx-auto font-medium mb-2">
            Discover sustainable, premium products from local artisans and eco-friendly brands.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-4 inline-flex items-center space-x-4">
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="inline-flex bg-green-100 rounded-full p-1 shadow-md mr-4">
                <button
                  className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${productType === 'olive' ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow' : 'bg-transparent text-green-900 hover:bg-green-200'}`}
                  onClick={() => setProductType('olive')}
                >
                  Olive Oil
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${productType === 'handcrafts' ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow' : 'bg-transparent text-green-900 hover:bg-green-200'}`}
                  onClick={() => setProductType('handcrafts')}
                >
                  Hand Crafts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`backdrop-blur-lg bg-white/70 border border-green-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === 'list' ? 'h-full' : 'h-48'
                  }`}
                />
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow">
                    Featured
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow">
                    Sale
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Out of Stock</span>
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <p className="text-green-900 text-base mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-extrabold text-green-700">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex items-center px-5 py-2 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {viewMode === 'list' ? 'Add to Cart' : ''}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSortBy('featured');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}