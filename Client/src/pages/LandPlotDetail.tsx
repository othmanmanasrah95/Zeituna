import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Heart, 
  Users, 
  Award, 
  TreePine, 
  Coins, 
  ArrowLeft,
  Calendar,
  Droplets,
  Sun,
  Leaf,
  Shield,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import landPlotService, { LandPlot } from '../services/landPlotService';

export default function LandPlotDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [landPlot, setLandPlot] = useState<LandPlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLandPlot = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await landPlotService.getLandPlot(id);
        
        if (response.success) {
          setLandPlot(response.data);
        } else {
          setError('Land plot not found');
        }
      } catch (err: any) {
        console.error('Error fetching land plot:', err);
        setError('Failed to load land plot information');
      } finally {
        setLoading(false);
      }
    };

    fetchLandPlot();
  }, [id]);

  const handleAdoptTree = () => {
    if (!landPlot) return;
    
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
          <p className="text-gray-600">Loading land plot details...</p>
        </div>
      </div>
    );
  }

  if (error || !landPlot) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <TreePine className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Land Plot Not Found</h2>
            <p className="text-gray-600 mt-2">{error || 'The land plot you are looking for does not exist.'}</p>
            <Link 
              to="/adopt" 
              className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Land Plots
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <Link 
              to="/adopt" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All Land Plots
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {landPlot.name}
            </h1>
            <div className="flex items-center justify-center text-gray-600 text-lg mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {landPlot.location}
            </div>
            <div className="text-lg text-gray-600">
              Managed by <span className="font-semibold text-green-600">{landPlot.farmer.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={landPlot.images[0] || '/treewihte1.png'}
                    alt={landPlot.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {landPlot.plotSize}
                  </div>
                  <div className="absolute top-6 right-6 bg-white bg-opacity-95 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold text-gray-800">
                    ${landPlot.adoptionPrice}/year
                  </div>
                </div>
                
                {/* Additional Images */}
                {landPlot.images.length > 1 && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">More Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {landPlot.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${landPlot.name} - Image ${index + 2}`}
                          className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Land Plot</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {landPlot.description}
                </p>
              </motion.div>

              {/* Plot Characteristics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Plot Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Droplets className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Soil Type</h3>
                      <p className="text-gray-600">{landPlot.soilType}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <Sun className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Climate</h3>
                      <p className="text-gray-600">{landPlot.climate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Leaf className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Plot Size</h3>
                      <p className="text-gray-600">{landPlot.plotSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">CO₂ Absorption</h3>
                      <p className="text-gray-600">{landPlot.estimatedCO2Absorption}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              {landPlot.benefits && landPlot.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Environmental Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {landPlot.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recent Updates */}
              {landPlot.updates && landPlot.updates.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates</h2>
                  <div className="space-y-4">
                    {landPlot.updates.slice(0, 3).map((update, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500">
                            {new Date(update.date).toLocaleDateString()}
                          </span>
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {update.type}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{update.title}</h3>
                        <p className="text-gray-600">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Adoption Info */}
            <div className="space-y-6">
              
              {/* Adoption Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Adopt a Tree</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${landPlot.adoptionPrice}
                    <span className="text-lg text-gray-500 font-normal">/year</span>
                  </div>
                  <p className="text-gray-600">One-time payment for full year</p>
                </div>

                {/* Tree Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Trees</span>
                    <span className="font-semibold text-gray-900">{landPlot.totalTrees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available</span>
                    <span className="font-semibold text-green-600">{landPlot.availableTrees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Adopted</span>
                    <span className="font-semibold text-blue-600">{landPlot.adoptedTrees}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Adoption Progress</span>
                    <span className="text-sm text-gray-600">{landPlot.adoptionProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${landPlot.adoptionProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* What You Get */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What You Get</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">Digital NFT Certificate (1 year)</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Coins className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">$33 worth of TUT tokens</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <TreePine className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">Your name in tree's history</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Heart className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">Direct farmer support</span>
                    </div>
                  </div>
                </div>

                {/* Adoption Button */}
                <button
                  onClick={handleAdoptTree}
                  disabled={landPlot.availableTrees === 0}
                  className={`w-full py-4 px-6 rounded-xl transition-all duration-300 font-bold text-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    landPlot.availableTrees === 0
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  }`}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {landPlot.availableTrees === 0 ? 'Fully Adopted' : 'Adopt a Tree'}
                </button>

                {landPlot.availableTrees > 0 && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Secure payment • Instant confirmation • 30-day money-back guarantee
                  </p>
                )}
              </motion.div>

              {/* Farmer Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Farmer Information</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{landPlot.farmer.name}</h4>
                    <p className="text-gray-600 text-sm">{landPlot.farmer.email}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  This experienced farmer manages the land plot and ensures the health and growth of all trees.
                </p>
              </motion.div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Plot Status</h3>
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    landPlot.status === 'Available' ? 'bg-green-100' :
                    landPlot.status === 'Fully Adopted' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    {landPlot.status === 'Available' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : landPlot.status === 'Fully Adopted' ? (
                      <Star className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{landPlot.status}</p>
                    <p className="text-gray-600 text-sm">
                      {landPlot.status === 'Available' ? 'Trees available for adoption' :
                       landPlot.status === 'Fully Adopted' ? 'All trees have been adopted' :
                       'Plot under maintenance'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
