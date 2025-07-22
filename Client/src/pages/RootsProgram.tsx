import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Coins, Heart, Award, ArrowRight, Leaf, Users, Calendar, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RootsProgram() {
  const programFeatures = [
    {
      icon: TreePine,
      title: 'Symbolic Adoption',
      description: 'Form a heartfelt bond with the land—adopt an olive tree and nurture a living connection to heritage, nature, and hope.',
      color: 'text-green-600'
    },
    {
      icon: Coins,
      title: 'Community Rewards',
      description: 'Be recognized and celebrated with special benefits for supporting sustainability.',
      color: 'text-yellow-600'
    },
    {
      icon: Heart,
      title: 'Support Farmers',
      description: 'Share your support—when you adopt, a portion of your contribution goes directly to the farmer who cares for your tree.',
      color: 'text-red-600'
    },
    {
      icon: Award,
      title: 'Digital Certificate',
      description: 'Receive a beautiful Digital Certificate personalized with your name—celebrating your connection to your adopted tree.',
      color: 'text-blue-600'
    }
  ];

  const adoptionBenefits = [
    'Digital NFT Certificate of Adoption (valid for 1 year)',
    'Personal name added to the tree\'s history log',
    '$33 worth of TUT tokens credited to your wallet',
    '$33 paid directly to the vendor/farmer',
    'Tree marked as "adopted" for 12 months',
    'Renewal reminders before expiration',
    'Access to exclusive adopter community'
  ];

  const stats = [
    { value: '2,847', label: 'Trees Available' },
    { value: '1,205', label: 'Active Adopters' },
    { value: '156', label: 'Partner Farms' },
    { value: '45.2t', label: 'CO₂ Impact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-white relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-300 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-tight">
                Welcome to the <span className="text-green-600">Roots Program</span>
              </h1>
              <p className="text-xl text-green-900 max-w-3xl mx-auto leading-relaxed font-medium">
                Connect with nature and support sustainable agriculture through our innovative tree adoption program. Adopt olive trees, earn tokens, and make a lasting environmental impact.
              </p>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Adopt a Tree */}
                  <div className="text-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 transition-colors bg-white/90 shadow-lg">
                    <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Adopt a Tree</h3>
                    <p className="text-gray-600 mb-4">Symbolic Annual Adoption</p>
                    <Link
                      to="/roots/adopt"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Adopting
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>

                  {/* Plant a Tree */}
                  <div className="text-center p-6 border-2 border-gray-200 rounded-xl bg-gray-50/80 relative">
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Coming Soon</span>
                    </div>
                    <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-500 mb-2">Plant a Tree</h3>
                    <p className="text-gray-500 mb-4">Legacy Contribution</p>
                    <button
                      disabled
                      className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Together, We Make Change
            </h2>
            <p className="text-xl text-gray-600">
              Join a community of changemakers—every adoption brings us closer to a greener future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center group backdrop-blur-lg bg-white/70 border border-green-100 rounded-2xl shadow-xl p-6"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Distribution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Your Contribution Makes an Impact
            </h2>
            <p className="text-xl text-gray-600">
              Every adoption supports you, local farmers, and the future of sustainable agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-green-100"
            >
              <Star className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rewards for You</h3>
              <p className="text-gray-600">Enjoy special benefits and recognition as a valued member of the Zeituna Roots community.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-green-100"
            >
              <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Support for Farmers</h3>
              <p className="text-gray-600">Your adoption directly helps the dedicated farmers who care for your tree and their communities.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-green-100"
            >
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growing the Movement</h3>
              <p className="text-gray-600">A portion of your contribution sustains our platform and expands environmental initiatives for a greener tomorrow.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Adoption Benefits (now Plant a Tree Teaser) */}
      <section className="py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&fit=crop&w=600&q=80"
                alt="Planting a young olive tree"
                className="rounded-3xl shadow-2xl border border-green-200 object-cover w-full h-80"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                Coming Soon
              </span>
            </motion.div>
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl font-extrabold text-green-900 mb-4">Plant a Tree — Coming Soon</h2>
              <p className="text-xl text-gray-700 mb-8">
                Be among the first to plant hope, nurture new roots, and leave a living legacy.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Leaf className="w-7 h-7 text-green-600" />
                  <span className="text-lg text-gray-800 font-medium">Leave a Legacy: Your tree will grow for generations.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-7 h-7 text-blue-600" />
                  <span className="text-lg text-gray-800 font-medium">Personal Connection: Receive updates and photos as your tree flourishes.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-7 h-7 text-red-600" />
                  <span className="text-lg text-gray-800 font-medium">Support Communities: Help local farmers and restore the land.</span>
                </div>
              </div>
              <button
                disabled
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg opacity-60 cursor-not-allowed"
              >
                Get Notified
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}