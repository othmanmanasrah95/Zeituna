import { useState, useEffect } from 'react';
import { MapPin, Heart, Users, Award, TreePine, Coins, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import landPlotService, { LandPlot } from '../services/landPlotService';



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
  const { addItem } = useCart();
  const [landPlots, setLandPlots] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        setLoading(true);
        console.log('Fetching land plots with status: Available');
        const response = await landPlotService.getLandPlots({ status: 'Available' });
        console.log('Land plots API response:', response);
        
        if (response.success && response.data.length > 0) {
          console.log('Found land plots:', response.data);
          setLandPlots(response.data);
        } else {
          console.log('No land plots found or response not successful');
          setError('No land plots available for adoption');
        }
      } catch (err: any) {
        console.error('Error fetching land plots:', err);
        console.error('Error details:', err.response?.data);
        setError('Failed to load land plot information');
      } finally {
        setLoading(false);
      }
    };

    fetchLandPlots();
  }, []);

  const handleAdoptTree = (landPlot: LandPlot) => {
    addItem({
      id: landPlot._id,
      name: `Tree Adoption - ${landPlot.name}`,
      price: landPlot.adoptionPrice,
      image: landPlot.images[0] || '/treewihte1.png',
      type: 'tree'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tree information...</p>
        </div>
      </div>
    );
  }

  if (error || landPlots.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <TreePine className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">No Land Plots Available</h2>
            <p className="text-gray-600 mt-2">{error || 'No land plots are currently available for adoption.'}</p>
          </div>
        </div>
      </div>
    );
  }

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
              Adopt a Tree from
              <span className="text-green-600"> Our Land Plots</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Choose from our carefully managed land plots and adopt a tree for $99/year. 
              Receive an NFT certificate, earn TUT tokens, and directly support Mediterranean farmers.
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
                  <div key={index} className="text-center">
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

      {/* Land Plots for Adoption */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Land Plot
            </h2>
            <p className="text-xl text-gray-600">
              Select from our managed land plots and adopt a tree to make a real environmental impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {landPlots.map((landPlot, index) => (
              <motion.div
                key={landPlot._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500"
              >
                <div className="relative">
                  <img
                    src={landPlot.images[0] || '/treewihte1.png'}
                    alt={landPlot.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {landPlot.plotSize}
                  </div>
                  <div className="absolute top-6 right-6 bg-white bg-opacity-95 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold text-gray-800">
                    ${landPlot.adoptionPrice}/year
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{landPlot.name}</h3>
                    <div className="flex items-center justify-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {landPlot.location}
                    </div>
                    <div className="text-sm text-gray-600">
                      Farmer: <span className="font-semibold text-green-600">{landPlot.farmer.name}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {landPlot.description}
                  </p>

                  {/* Land Plot Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Trees</div>
                      <div className="text-lg font-bold text-gray-900">{landPlot.totalTrees}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">Available</div>
                      <div className="text-lg font-bold text-green-600">{landPlot.availableTrees}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">Adopted</div>
                      <div className="text-lg font-bold text-blue-600">{landPlot.adoptedTrees}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">CO₂ Impact</div>
                      <div className="text-lg font-bold text-green-600">{landPlot.estimatedCO2Absorption}</div>
                    </div>
                  </div>

                  {/* Adoption Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Adoption Progress</span>
                      <span className="text-sm text-gray-600">
                        {landPlot.adoptedTrees}/{landPlot.totalTrees} trees adopted
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${landPlot.adoptionProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {landPlot.availableTrees} trees available for adoption
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">Plot Benefits</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {landPlot.benefits.slice(0, 3).map((benefit, index) => (
                        <div
                          key={index}
                          className="bg-green-50 border border-green-200 text-green-800 text-xs px-3 py-2 rounded-lg text-center font-medium"
                        >
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Learn More Button */}
                    <Link
                      to={`/land-plot/${landPlot._id}`}
                      className="w-full py-3 px-6 rounded-xl transition-all duration-300 font-bold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Learn More
                    </Link>
                    
                    {/* Adoption Button */}
                    <button
                      onClick={() => handleAdoptTree(landPlot)}
                      disabled={landPlot.availableTrees === 0}
                      className={`w-full py-3 px-6 rounded-xl transition-all duration-300 font-bold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                        landPlot.availableTrees === 0
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                      }`}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {landPlot.availableTrees === 0 ? 'Fully Adopted' : `Adopt a Tree - $${landPlot.adoptionPrice}/year`}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      {landPlot.availableTrees > 0 ? 'Secure payment • Instant confirmation' : 'Check back for new trees'}
                    </p>
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
              How Land Plot Adoption Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to adopt a tree from our managed land plots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Choose Land Plot',
                description: 'Select from our managed land plots and adopt a tree',
                icon: TreePine
              },
              {
                step: 2,
                title: 'Complete Payment',
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


    </div>
  );
}