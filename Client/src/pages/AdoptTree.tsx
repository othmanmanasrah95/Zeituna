import { useState, useEffect } from 'react';
import { MapPin, Heart, Users, Award, TreePine, Coins, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import landPlotService, { LandPlot } from '../services/landPlotService';



const adoptionFeatures = [
  {
    icon: Award,
    title: 'Digital Certificate',
    description: 'Digital certificate of adoption valid for 1 year'
  },
  {
    icon: Coins,
    title: '22 TUT Tokens',
    description: 'Redeemable for 750ml premium olive oil'
  },
  {
    icon: Heart,
    title: 'Support Farmers',
    description: 'Some of the money will be redirected to the farmers'
  },
  {
    icon: TreePine,
    title: 'Tree History',
    description: 'Your name permanently recorded in Zeituna and Tourath records'
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
      } catch (err: unknown) {
        console.error('Error fetching land plots:', err);
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
              Choose from our carefully managed land plots and adopt a tree for 99JOD / year. 
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
                <div className="text-4xl font-bold text-green-600 mb-2">99JOD / year</div>
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
      <section id="land-plots" className="py-20 bg-white">
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
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Info className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              How Land Plot Adoption Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to adopt a tree and make a lasting impact on the environment
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-blue-200 to-green-200 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: 1,
                  title: 'Choose Land Plot',
                  description: 'Select from our carefully managed land plots and pick a tree to adopt',
                  icon: TreePine,
                  color: 'from-green-500 to-green-600',
                  bgColor: 'bg-green-50',
                  iconColor: 'text-green-600'
                },
                {
                  step: 2,
                  title: 'Complete Payment',
                  description: 'Pay 99JOD for one-year symbolic adoption with instant confirmation',
                  icon: Heart,
                  color: 'from-red-500 to-pink-600',
                  bgColor: 'bg-red-50',
                  iconColor: 'text-red-600'
                },
                {
                  step: 3,
                  title: 'Receive Certificate & Tokens',
                  description: 'Get your digital certificate and 22 TUT tokens redeemable for olive oil',
                  icon: Award,
                  color: 'from-blue-500 to-blue-600',
                  bgColor: 'bg-blue-50',
                  iconColor: 'text-blue-600'
                },
                {
                  step: 4,
                  title: 'Support Farmers',
                  description: 'Some of the money goes directly to the farmer caring for your adopted tree',
                  icon: Users,
                  color: 'from-purple-500 to-purple-600',
                  bgColor: 'bg-purple-50',
                  iconColor: 'text-purple-600'
                }
              ].map((step) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: step.step * 0.2 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className={`${step.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm`}>
                    {/* Step Number Badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.color} text-white rounded-full text-lg font-bold mb-4 shadow-lg`}>
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 ${step.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md`}>
                      <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Arrow for Mobile */}
                  {step.step < 4 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of people who have already adopted trees and are making a positive impact on the environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('land-plots')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Browse Land Plots
                </button>
                <Link
                  to="/roots"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}