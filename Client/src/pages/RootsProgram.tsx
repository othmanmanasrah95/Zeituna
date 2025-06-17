import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Coins, Heart, Award, ArrowRight, Leaf, Users, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RootsProgram() {
  const programFeatures = [
    {
      icon: TreePine,
      title: 'Symbolic Adoption',
      description: 'Adopt an existing olive tree for one year with a digital NFT certificate',
      color: 'text-green-600'
    },
    {
      icon: Coins,
      title: 'TUT Token Rewards',
      description: '$33 worth of TUT tokens credited directly to your Zeituna wallet',
      color: 'text-yellow-600'
    },
    {
      icon: Heart,
      title: 'Support Farmers',
      description: '$33 paid directly to local Mediterranean farmers and vendors',
      color: 'text-red-600'
    },
    {
      icon: Award,
      title: 'Digital Certificate',
      description: 'Receive a unique NFT certificate with your name in the tree\'s history',
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to the
                <span className="text-green-600"> Roots Program</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with nature and support sustainable agriculture through our innovative tree adoption program. 
                Adopt olive trees, earn tokens, and make a lasting environmental impact.
              </p>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Adopt a Tree */}
                  <div className="text-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 transition-colors">
                    <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Adopt a Tree</h3>
                    <p className="text-gray-600 mb-4">Symbolic Annual Adoption</p>
                    <div className="text-3xl font-bold text-green-600 mb-4">$99/year</div>
                    <Link
                      to="/roots/adopt"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Adopting
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>

                  {/* Plant a Tree */}
                  <div className="text-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 transition-colors">
                    <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Plant a Tree</h3>
                    <p className="text-gray-600 mb-4">Legacy Contribution</p>
                    <div className="text-3xl font-bold text-green-600 mb-4">$149+</div>
                    <Link
                      to="/roots/plant"
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Planting
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How the Roots Program Works
            </h2>
            <p className="text-xl text-gray-600">
              A sustainable ecosystem that benefits everyone involved
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center group"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Token Distribution
            </h2>
            <p className="text-xl text-gray-600">
              Transparent allocation of your $99 adoption fee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Coins className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$33</h3>
              <p className="text-yellow-600 font-semibold mb-2">TUT Tokens</p>
              <p className="text-gray-600">Credited to your Zeituna wallet for future purchases and rewards</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Heart className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$33</h3>
              <p className="text-red-600 font-semibold mb-2">Farmer Payment</p>
              <p className="text-gray-600">Direct payment to Mediterranean farmers and vendors in ILS</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$33</h3>
              <p className="text-green-600 font-semibold mb-2">Platform Maintenance</p>
              <p className="text-gray-600">Supporting platform operations and environmental initiatives</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Adoption Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What You Get with Adoption
              </h2>
              <div className="space-y-4">
                {adoptionBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="ml-3 text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/roots/adopt"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Your Adoption Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/4464816/pexels-photo-4464816.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Olive tree adoption"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">NFT Certificate</div>
                    <div className="text-sm text-gray-600">Blockchain verified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-green-100">
              Growing together for a sustainable future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Join the Roots Program?
            </h2>
            <p className="text-xl leading-relaxed">
              Start your journey towards sustainable impact. Adopt an olive tree today and become part of our growing community of environmental stewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/roots/adopt"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Adopt Your First Tree
                <TreePine className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}