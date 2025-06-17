import React, { useState } from 'react';
import { MapPin, Calendar, Leaf, Heart, Users, Award, TreePine, Coins, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface Tree {
  id: string;
  name: string;
  species: string;
  location: string;
  plantedDate: string;
  age: string;
  height: string;
  co2Absorbed: string;
  adoptionPrice: number;
  image: string;
  description: string;
  benefits: string[];
  adopters: number;
  maxAdopters: number;
  progress: number;
  farmerId: string;
  farmerName: string;
}

const mockTrees: Tree[] = [
  {
    id: 't1',
    name: 'Mediterranean Oak "Sophia"',
    species: 'Quercus ilex',
    location: 'Sierra Nevada, Spain',
    plantedDate: '2023-03-15',
    age: '2 years',
    height: '1.8m',
    co2Absorbed: '25kg/year',
    adoptionPrice: 99.00,
    image: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    description: 'A young Mediterranean oak that will grow to provide shade and habitat for local wildlife.',
    benefits: ['Carbon sequestration', 'Wildlife habitat', 'Soil erosion prevention', 'Air purification'],
    adopters: 8,
    maxAdopters: 10,
    progress: 80,
    farmerId: 'f1',
    farmerName: 'Carlos Mendez'
  },
  {
    id: 't2',
    name: 'Olive Heritage "Luna"',
    species: 'Olea europaea',
    location: 'Andalusia, Spain',
    plantedDate: '2023-09-10',
    age: '1.5 years',
    height: '1.2m',
    co2Absorbed: '20kg/year',
    adoptionPrice: 99.00,
    image: 'https://images.pexels.com/photos/4464816/pexels-photo-4464816.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    description: 'A young olive tree that will produce olives for generations while preserving traditional agriculture.',
    benefits: ['Olive production', 'Traditional farming', 'Drought resistance', 'Cultural value'],
    adopters: 6,
    maxAdopters: 8,
    progress: 75,
    farmerId: 'f2',
    farmerName: 'Maria Rodriguez'
  },
  {
    id: 't3',
    name: 'Ancient Olive "Esperanza"',
    species: 'Olea europaea',
    location: 'Tuscany, Italy',
    plantedDate: '2022-11-20',
    age: '3 years',
    height: '2.1m',
    co2Absorbed: '30kg/year',
    adoptionPrice: 99.00,
    image: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    description: 'A heritage olive tree that connects you to centuries of Mediterranean tradition.',
    benefits: ['Heritage preservation', 'Premium olive oil', 'Cultural significance', 'Biodiversity'],
    adopters: 12,
    maxAdopters: 15,
    progress: 80,
    farmerId: 'f3',
    farmerName: 'Giuseppe Rossi'
  },
  {
    id: 't4',
    name: 'Young Olive "Vida"',
    species: 'Olea europaea',
    location: 'Crete, Greece',
    plantedDate: '2024-01-15',
    age: '1 year',
    height: '0.8m',
    co2Absorbed: '15kg/year',
    adoptionPrice: 99.00,
    image: 'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    description: 'A newly planted olive tree ready to grow with your support and care.',
    benefits: ['New growth potential', 'Future olive production', 'Climate adaptation', 'Soil improvement'],
    adopters: 3,
    maxAdopters: 10,
    progress: 30,
    farmerId: 'f4',
    farmerName: 'Dimitris Papadopoulos'
  }
];

const adoptionFeatures = [
  {
    icon: Award,
    title: 'NFT Certificate',
    description: 'Digital certificate of adoption valid for 1 year'
  },
  {
    icon: Coins,
    title: 'TUT Tokens',
    description: '$33 worth of tokens credited to your wallet'
  },
  {
    icon: Heart,
    title: 'Support Farmers',
    description: '$33 paid directly to the tree\'s farmer'
  },
  {
    icon: TreePine,
    title: 'Tree History',
    description: 'Your name added to the tree\'s permanent record'
  }
];

export default function AdoptTree() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const { addItem } = useCart();

  const handleAdoptTree = (tree: Tree) => {
    addItem({
      id: tree.id,
      name: `Tree Adoption - ${tree.name}`,
      price: tree.adoptionPrice,
      image: tree.image,
      type: 'tree'
    });
    setSelectedTree(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Adopt an
              <span className="text-green-600"> Olive Tree</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Symbolically adopt an existing olive tree for $99/year. Receive an NFT certificate, 
              earn TUT tokens, and directly support Mediterranean farmers.
            </motion.p>

            {/* Adoption Package Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Adoption Package</h2>
                <div className="text-4xl font-bold text-green-600 mb-2">$99/year</div>
                <p className="text-gray-600">Symbolic Annual Adoption</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adoptionFeatures.map((feature, index) => (
                  <div key={feature.title} className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Trees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Tree to Adopt
            </h2>
            <p className="text-xl text-gray-600">
              Each adoption includes NFT certificate, TUT tokens, and farmer support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockTrees.map((tree, index) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={tree.image}
                    alt={tree.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {tree.species}
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    ${tree.adoptionPrice}/year
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{tree.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tree.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        Farmer: <span className="font-medium">{tree.farmerName}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{tree.description}</p>

                  {/* Tree Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Age</div>
                      <div className="font-semibold text-gray-900">{tree.age}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Height</div>
                      <div className="font-semibold text-gray-900">{tree.height}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">CO₂ Absorbed</div>
                      <div className="font-semibold text-green-600">{tree.co2Absorbed}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Planted</div>
                      <div className="font-semibold text-gray-900">
                        {new Date(tree.plantedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Adoption Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Adoption Progress</span>
                      <span className="text-sm text-gray-600">
                        {tree.adopters}/{tree.maxAdopters} adopters
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tree.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tree.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedTree(tree)}
                      className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleAdoptTree(tree)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Adopt Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Tree Adoption Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to make a lasting environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Choose Your Tree',
                description: 'Browse available olive trees and select one that resonates with you',
                icon: TreePine
              },
              {
                step: 2,
                title: 'Complete Adoption',
                description: 'Pay $99 for one-year symbolic adoption with instant confirmation',
                icon: Heart
              },
              {
                step: 3,
                title: 'Receive NFT & Tokens',
                description: 'Get your digital certificate and $33 worth of TUT tokens',
                icon: Award
              },
              {
                step: 4,
                title: 'Support Farmers',
                description: '$33 goes directly to the farmer caring for your adopted tree',
                icon: Users
              }
            ].map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: step.step * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <step.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tree Detail Modal */}
      {selectedTree && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTree(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedTree.image}
                alt={selectedTree.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedTree(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTree.name}</h2>
              <p className="text-gray-600 mb-6">{selectedTree.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Species</div>
                  <div className="font-semibold">{selectedTree.species}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Location</div>
                  <div className="font-semibold">{selectedTree.location}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Farmer</div>
                  <div className="font-semibold">{selectedTree.farmerName}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Age</div>
                  <div className="font-semibold">{selectedTree.age}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Adoption Benefits</h3>
                <div className="space-y-2">
                  {selectedTree.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center">
                      <Leaf className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">What You Get:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Digital NFT Certificate of Adoption (1 year)</li>
                  <li>• $33 worth of TUT tokens in your wallet</li>
                  <li>• Your name in the tree's permanent history</li>
                  <li>• Direct support to farmer {selectedTree.farmerName}</li>
                  <li>• Renewal reminders before expiration</li>
                </ul>
              </div>

              <button
                onClick={() => handleAdoptTree(selectedTree)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Adopt for ${selectedTree.adoptionPrice}/year
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}