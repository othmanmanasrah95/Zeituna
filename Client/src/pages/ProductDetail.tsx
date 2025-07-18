import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, Leaf, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Organic Extra Virgin Olive Oil',
  price: 24.99,
  originalPrice: 29.99,
  images: [
    'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/1893669/pexels-photo-1893669.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/159872/olive-oil-food-cooking-oil-159872.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
  ],
  rating: 4.8,
  reviews: 156,
  category: 'Organic Foods',
  description: 'Premium cold-pressed extra virgin olive oil sourced from century-old olive groves in the Mediterranean. Our artisanal process preserves the natural flavors and nutritional benefits, delivering a rich, fruity taste with a perfect balance of peppery finish.',
  features: [
    'Cold-pressed within 24 hours of harvest',
    'Certified organic by EU standards',
    'Single estate sourcing',
    'Dark glass bottle for UV protection',
    'Recyclable packaging'
  ],
  specifications: {
    'Volume': '500ml',
    'Origin': 'Andalusia, Spain',
    'Harvest Date': 'October 2023',
    'Acidity Level': '< 0.3%',
    'Storage': 'Cool, dark place'
  },
  inStock: true,
  stockQuantity: 24,
  shipping: {
    free: true,
    estimatedDays: '3-5 business days'
  },
  sustainability: {
    carbonNeutral: true,
    locallySourced: true,
    plasticFree: true
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = mockProduct; // In real app, fetch by id

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        type: 'product'
      });
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'sustainability', label: 'Sustainability' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-green-500' : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
              
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Leaf className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sustainability Icons */}
            <div className="flex space-x-6">
              {product.sustainability.carbonNeutral && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Carbon Neutral</span>
                </div>
              )}
              {product.sustainability.locallySourced && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Locally Sourced</span>
                </div>
              )}
              {product.sustainability.plasticFree && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Plastic Free</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockQuantity} available
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">
                  {product.shipping.free ? 'Free shipping' : 'Shipping calculated at checkout'}
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Estimated delivery: {product.shipping.estimatedDays}
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Premium Quality</h3>
                <p className="text-gray-600">
                  Our olive oil represents the pinnacle of Mediterranean tradition and modern quality standards. 
                  Each bottle contains the essence of sun-drenched olive groves and the expertise of generations 
                  of olive farmers.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                {/* Mock reviews */}
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium text-gray-900">Amazing quality!</span>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600">
                      This olive oil exceeded my expectations. The flavor is rich and complex, 
                      perfect for both cooking and drizzling over salads.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">By Sarah M.</span>
                      <span className="ml-2 text-sm text-green-600">Verified Purchase</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Our Environmental Commitment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <Leaf className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Carbon Neutral</h4>
                    <p className="text-gray-600 text-sm">
                      We offset 100% of our carbon footprint through verified reforestation projects.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <Truck className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Local Sourcing</h4>
                    <p className="text-gray-600 text-sm">
                      Sourced within 50km of our processing facility to minimize transportation impact.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <Shield className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Plastic-Free</h4>
                    <p className="text-gray-600 text-sm">
                      All packaging is recyclable or compostable, with zero single-use plastics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}