import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TreePine, Coins, Heart, Users, Star } from 'lucide-react';

export default function Home() {
  // Features
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />, title: 'Curated Sustainable Marketplace', desc: 'Shop premium, eco-conscious products handpicked for quality and impact.' , color: 'bg-blue-500'
    },
    {
      icon: <TreePine className="w-8 h-8 text-white" />, title: 'Adopt an Olive Tree', desc: 'Make a lasting difference—adopt a tree and receive a unique NFT certificate.', color: 'bg-green-500'
    },
    {
      icon: <Coins className="w-8 h-8 text-white" />, title: 'Direct Farmer Support', desc: 'Connect directly with Palestinian farmers and help sustain traditional agriculture.', color: 'bg-yellow-500'
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
  const selected = oliveOilVariants[selectedIndex];

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
                  to="/marketplace"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg"
                >
                  Explore Marketplace
                </Link>
                <Link
                  to="/roots"
              className="px-8 py-4 bg-white text-green-700 rounded-lg font-semibold text-lg hover:bg-green-100 transition-all duration-300 shadow-lg border border-green-600"
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

      {/* Olive Oil Product Card with Variations */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg tracking-tight">Premium Olive Oil</h2>
            <p className="text-xl text-gray-600">Select your perfect size and enjoy the finest extra virgin olive oil, directly from our groves to your table.</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-3xl shadow-xl flex flex-col md:flex-row items-center p-0 md:p-0 animate-fadeInUp overflow-hidden border border-green-100">
            {/* Product Info Left */}
            <div className="w-full md:w-1/2 flex flex-col items-start p-8 md:p-12">
              <h3 className="text-4xl font-extrabold text-green-900 mb-4 tracking-tight">Olive Oil {selected.size}</h3>
              <p className="text-green-800 mb-8 text-lg min-h-[48px]">{selected.desc}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {oliveOilVariants.map((variant, i) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedIndex(i)}
                    className={`px-5 py-2 rounded-full border font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${selectedIndex === i ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white border-green-700 shadow-lg scale-105' : 'bg-white text-green-900 border-green-200 hover:bg-green-50'}`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
              <div className="text-3xl font-extrabold text-green-700 mb-8">${selected.price.toFixed(2)}</div>
              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:from-green-700 hover:to-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400">Add to Cart</button>
            </div>
            {/* Divider for desktop */}
            <div className="hidden md:block h-80 w-px bg-green-100 mx-2 rounded-full" />
            {/* Image Right - full cover */}
            <div
              className="w-full md:w-1/2 min-h-[300px] md:min-h-[480px] h-full"
              style={{
                backgroundImage: `url(${selected.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              aria-label={`Olive Oil ${selected.size}`}
            />
          </div>
        </div>
        <style>{`
          .animate-fadeInUp {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUp 0.8s both;
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