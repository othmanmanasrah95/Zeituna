import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Leaf, Heart, Camera, Award, TreePine, Coins, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

// Mock tree data
const mockTree = {
  id: 't1',
  name: 'Mediterranean Oak "Sophia"',
  species: 'Quercus ilex',
  location: 'Sierra Nevada, Spain',
  coordinates: '37.0956°N, 3.4707°W',
  plantedDate: '2023-03-15',
  age: '2 years',
  height: '1.8m',
  co2Absorbed: '25kg/year',
  adoptionPrice: 99.00,
  farmerName: 'Carlos Mendez',
  farmerId: 'f1',
  images: [
    'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
  ],
  description: 'Sophia is a young Mediterranean oak planted in the heart of Sierra Nevada. This resilient species is known for its longevity and ability to thrive in Mediterranean climates. As she grows, Sophia will provide habitat for local wildlife and contribute significantly to carbon sequestration.',
  benefits: [
    'Carbon sequestration of 25kg CO₂ per year',
    'Wildlife habitat for local species',
    'Soil erosion prevention',
    'Air quality improvement',
    'Biodiversity conservation'
  ],
  adopters: 8,
  maxAdopters: 10,
  progress: 80,
  growthHistory: [
    { date: '2023-03-15', height: '0.3m', event: 'Planted' },
    { date: '2023-06-15', height: '0.6m', event: 'First growth spurt' },
    { date: '2023-09-15', height: '1.0m', event: 'Survived first summer' },
    { date: '2024-03-15', height: '1.5m', event: 'First birthday' },
    { date: '2024-09-15', height: '1.8m', event: 'Current height' }
  ],
  updates: [
    {
      date: '2024-09-15',
      title: 'Autumn Growth Update',
      content: 'Sophia has grown 30cm since spring! Her leaves are developing the characteristic dark green color of mature Mediterranean oaks.',
      image: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      date: '2024-06-20',
      title: 'Wildlife Spotting',
      content: 'Local birds have started nesting near Sophia. We spotted a pair of European robins building their nest in her branches.',
      image: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    }
  ]
};

export default function TreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const tree = mockTree; // In real app, fetch by id

  const handleAdoptTree = () => {
    addItem({
      id: tree.id,
      name: `Tree Adoption - ${tree.name}`,
      price: tree.adoptionPrice,
      image: tree.images[0],
      type: 'tree'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'adoption', label: 'Adoption Details' },
    { id: 'growth', label: 'Growth History' },
    { id: 'updates', label: 'Updates' },
    { id: 'impact', label: 'Environmental Impact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to trees
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tree Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={tree.images[selectedImage]}
                alt={tree.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex space-x-4">
              {tree.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-green-500' : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${tree.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tree Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                  {tree.species}
                </span>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Available for Adoption
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{tree.name}</h1>
              
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{tree.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">Planted {new Date(tree.plantedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-600">
                <User className="w-4 h-4 mr-1" />
                <span className="text-sm">Farmer: <span className="font-medium">{tree.farmerName}</span></span>
              </div>
            </div>

            {/* Adoption Package */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Adoption Package</h3>
                  <span className="text-3xl font-bold text-green-800">${tree.adoptionPrice}</span>
                  <span className="text-green-600 ml-2">/year</span>
                </div>
                <TreePine className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-800">$33</div>
                  <div className="text-xs text-green-700">TUT Tokens</div>
                </div>
                <div className="text-center">
                  <Heart className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-800">$33</div>
                  <div className="text-xs text-green-700">To Farmer</div>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-800">NFT</div>
                  <div className="text-xs text-green-700">Certificate</div>
                </div>
              </div>
              
              <p className="text-sm text-green-700">
                Includes digital certificate, TUT tokens, and direct farmer support
              </p>
            </div>

            {/* Tree Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600">Current Age</div>
                <div className="text-xl font-bold text-gray-900">{tree.age}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600">Height</div>
                <div className="text-xl font-bold text-gray-900">{tree.height}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600">CO₂ Absorbed</div>
                <div className="text-xl font-bold text-green-600">{tree.co2Absorbed}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600">GPS Coordinates</div>
                <div className="text-sm font-medium text-gray-900">{tree.coordinates}</div>
              </div>
            </div>

            {/* Adoption Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Adoption Progress</span>
                <span className="text-sm text-gray-600">
                  {tree.adopters}/{tree.maxAdopters} adopters
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${tree.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {tree.maxAdopters - tree.adopters} adoption spots remaining
              </p>
            </div>

            {/* Adopt Button */}
            <div className="flex space-x-4">
              <button
                onClick={handleAdoptTree}
                className="flex-1 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
              >
                <Heart className="w-5 h-5 mr-2" />
                Adopt This Tree
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Tree Details Tabs */}
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
            {activeTab === 'overview' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Tree</h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {tree.description}
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Environmental Benefits</h4>
                <ul className="space-y-2 mb-6">
                  {tree.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Leaf className="w-4 h-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Location Details</h4>
                <p className="text-gray-600">
                  Located in the Sierra Nevada mountain range in southern Spain, this area provides ideal 
                  conditions for Mediterranean oaks. The region's climate and soil composition create 
                  perfect growing conditions for these magnificent trees.
                </p>
              </div>
            )}

            {activeTab === 'adoption' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Adoption Details</h3>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-4">What You Get with Adoption</h4>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Digital NFT Certificate</div>
                        <div className="text-sm text-green-700">Blockchain-verified certificate valid for 1 year</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Coins className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">$33 Worth of TUT Tokens</div>
                        <div className="text-sm text-green-700">Credited directly to your Zeituna wallet</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Direct Farmer Support</div>
                        <div className="text-sm text-green-700">$33 paid directly to {tree.farmerName} in ILS</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <TreePine className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Tree History Record</div>
                        <div className="text-sm text-green-700">Your name permanently added to the tree's history log</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Adoption Terms</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Adoption period: 12 months from purchase date</li>
                    <li>• Tree marked as "adopted" during your adoption period</li>
                    <li>• Renewal reminders sent before expiration</li>
                    <li>• If not renewed, tree becomes available for adoption again</li>
                    <li>• Access to exclusive adopter community and updates</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Growth Timeline</h3>
                
                <div className="space-y-4">
                  {tree.growthHistory.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TreePine className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{entry.event}</h4>
                          <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600">Height: {entry.height}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Updates</h3>
                
                {tree.updates.map((update, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{update.title}</h4>
                        <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Environmental Impact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <Leaf className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Carbon Sequestration</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      This tree absorbs approximately 25kg of CO₂ annually, equivalent to:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 55 miles of car driving</li>
                      <li>• 28 pounds of coal burned</li>
                      <li>• 3 gallons of gasoline</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <Award className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Biodiversity Support</h4>
                    <p className="text-gray-600 text-sm">
                      Mediterranean oaks support over 300 species of insects, birds, and mammals. 
                      They provide nesting sites, food sources, and shelter for local wildlife.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <TreePine className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Soil Conservation</h4>
                    <p className="text-gray-600 text-sm">
                      The extensive root system prevents soil erosion and improves water retention, 
                      helping to maintain the health of the surrounding ecosystem.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Long-term Projections</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">500kg</div>
                      <div className="text-sm text-gray-600">CO₂ absorbed in 20 years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15m</div>
                      <div className="text-sm text-gray-600">Estimated mature height</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">200+</div>
                      <div className="text-sm text-gray-600">Years of environmental service</div>
                    </div>
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