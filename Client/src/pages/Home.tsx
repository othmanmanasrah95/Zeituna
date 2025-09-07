import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TreePine, Coins, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

export default function Home() {
  const { addItem } = useCart();
  
  // Features
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />, title: 'Curated Sustainable Marketplace', desc: 'Shop premium, eco-conscious products handpicked for quality and impact.' , color: 'bg-blue-500'
    },
    {
      icon: <TreePine className="w-8 h-8 text-white" />, title: 'Adopt an Olive Tree', desc: 'Make a lasting difference—adopt a tree and receive a unique NFT certificate.', color: 'bg-green-500'
    },
    {
      icon: <Coins className="w-8 h-8 text-white" />, title: 'Direct Farmer Support', desc: 'Connect directly with Palestinian farmers and help sustain agriculture.', color: 'bg-yellow-500'
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />, title: 'Positive Community Impact', desc: 'Your purchases drive real change for the environment and local communities.', color: 'bg-red-500'
    }
  ];

  // Olive Oil Product Variants
  const oliveOilVariants = [
    {
      size: '250ml',
      price: 7.99,
      image: '/oil.png',
      desc: 'Perfect for tasting or gifting. Premium cold-pressed extra virgin olive oil.'
    },
    {
      size: '500ml',
      price: 13.99,
      image: '/oil.png',
      desc: 'Ideal for daily use in salads and cooking. Fresh, robust flavor.'
    },
    {
      size: '750ml',
      price: 18.99,
      image: '/oil.png',
      desc: 'Great value for families. Sustainably sourced, rich in antioxidants.'
    },
    {
      size: '1L',
      price: 23.99,
      image: '/oil.png',
      desc: 'For the true olive oil lover. Pure, Palestinian taste in every drop.'
    },
    {
      size: '2L',
      price: 39.99,
      image: '/oil.png',
      desc: 'Bulk size for chefs and families. Unmatched quality and freshness.'
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const selected = oliveOilVariants[selectedIndex];

  const handleAddToCart = () => {
    console.log('Home: Add to Cart clicked!');
    console.log('Home: Selected variant:', selected);
    
    const cartItem = {
      id: `olive-oil-${selected.size.toLowerCase()}`,
      name: `Premium Olive Oil ${selected.size}`,
      price: selected.price,
      image: selected.image,
      type: 'product' as const
    };
    
    console.log('Home: Adding item to cart:', cartItem);
    addItem(cartItem);
    
    // Show success message
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
    
    console.log('Home: Item added to cart successfully');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/assets_task_01k0mvvh89efqadt8dwf17x9kc_task_01k0mvvh89efqadt8dwf17x9kc_genid_b3f2495d-219b-49ef-b888-fdb551baf921_25_07_20_21_31_275149_videos_00000_61819355_source.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Experience Sustainable Living with Zeituna
              </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow">
            Discover a curated selection of eco-friendly products, adopt an olive tree, and earn rewards—while making a positive impact on our planet and supporting Palestinian communities.
              </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/roots"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg"
                >
                  Join Roots Program
                </Link>
                
          </div>
        </div>
                </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-black via-green-900/80 to-blue-900/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-600 opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">Why Zeituna?</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto font-medium">Zeituna empowers you to shop consciously, support local farmers, and join a global movement for a greener tomorrow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform duration-300 group relative overflow-hidden"
                style={{ animation: `fadeInUp 0.7s ${i * 0.1 + 0.2}s both` }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white/30`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow">{feature.title}</h3>
                <p className="text-green-100 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Premium Olive Oil Product Showcase */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 opacity-20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 opacity-20 rounded-full blur-2xl animate-pulse animation-delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Premium Quality
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-800 via-green-600 to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
              Premium Olive Oil
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select your perfect size and enjoy the finest extra virgin olive oil, directly from our groves to your table. 
              Each bottle represents generations of Palestinian olive farming tradition.
            </p>
          </div>

          {/* Main Product Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Section */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <div 
                  className="aspect-square rounded-2xl bg-white shadow-inner flex items-center justify-center transition-all duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${selected.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {/* Product badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {selected.size}
                  </div>
                  
                  {/* Quality indicators */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 blur-xl animate-pulse animation-delay-1000" />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              {/* Product Title & Description */}
              <div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Olive Oil <span className="text-green-600">{selected.size}</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed min-h-[60px]">
                  {selected.desc}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Size</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {oliveOilVariants.map((variant, i) => (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedIndex(i)}
                      className={`relative p-4 rounded-2xl border-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 ${
                        selectedIndex === i 
                          ? 'bg-gradient-to-br from-green-600 to-blue-600 text-white border-transparent shadow-xl scale-105' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:scale-102'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">{variant.size}</div>
                        <div className={`text-sm mt-1 ${selectedIndex === i ? 'text-green-100' : 'text-gray-500'}`}>
                          ${variant.price.toFixed(2)}
                        </div>
                      </div>
                      {selectedIndex === i && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Features */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-extrabold text-gray-900">${selected.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Free shipping on orders over $25</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">4.9/5 (127 reviews)</div>
                  </div>
                </div>
                
                {/* Product features */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Cold Pressed
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Extra Virgin
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Organic Certified
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Direct from Farm
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
              </div>

              {/* Success Message */}
              {showAddedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        Premium Olive Oil {selected.size} added to cart!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Natural</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">30+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5★</div>
                  <div className="text-sm text-gray-600">Quality Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          .animate-fadeInUp {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUp 0.8s both;
          }
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-blue-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500 opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">Ready to Make a Difference?</h2>
            <p className="text-xl text-green-100 mb-10 font-medium max-w-2xl mx-auto">Become part of a passionate community. Start your sustainable journey with Zeituna and help shape a brighter, greener future for all.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Link to="/register" className="flex-1 px-8 py-4 bg-white text-green-700 rounded-lg font-bold text-lg hover:bg-green-100 transition-all duration-300 shadow-lg border border-green-600">Get Started Today</Link>
              <Link to="/roots/adopt" className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg border border-white/30">Adopt Your First Tree</Link>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s both;
          }
        `}</style>
      </section>
    </div>
  );
}