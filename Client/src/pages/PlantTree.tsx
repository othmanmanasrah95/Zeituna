import React, { useState } from 'react';
import { TreePine, Leaf, Calendar, MapPin, Award, Coins, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlantingFormData {
  treeType: string;
  location: string;
  personalMessage: string;
  quantity: number;
}

const treeTypes = [
  { id: 'olive', name: 'Olive Tree', price: 149, description: 'Traditional Mediterranean olive tree' },
  { id: 'cypress', name: 'Cypress Tree', price: 169, description: 'Classic Mediterranean cypress' },
  { id: 'almond', name: 'Almond Tree', price: 159, description: 'Fruit-bearing almond tree' },
  { id: 'fig', name: 'Fig Tree', price: 179, description: 'Ancient Mediterranean fig tree' }
];

const plantingLocations = [
  { id: 'north', name: 'Northern Region', description: 'Cooler climate, ideal for olive trees' },
  { id: 'central', name: 'Central Valley', description: 'Moderate climate, perfect for mixed species' },
  { id: 'south', name: 'Southern Coast', description: 'Warmer climate, excellent for fig trees' }
];

export default function PlantTree() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PlantingFormData>({
    treeType: '',
    location: '',
    personalMessage: '',
    quantity: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setFormData(prev => ({
        ...prev,
        quantity: value
      }));
    }
  };

  const selectedTree = treeTypes.find(tree => tree.id === formData.treeType);
  const selectedLocation = plantingLocations.find(loc => loc.id === formData.location);
  const totalPrice = selectedTree ? selectedTree.price * formData.quantity : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your backend API
    console.log('Planting submission:', formData);
    // For now, we'll just move to the confirmation step
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Choose Your Tree Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treeTypes.map(tree => (
                <div
                  key={tree.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.treeType === tree.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, treeType: tree.id }))}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{tree.name}</h4>
                      <p className="text-sm text-gray-600">{tree.description}</p>
                    </div>
                    <div className="text-lg font-bold text-blue-600">${tree.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.treeType}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Select Planting Location</h3>
            <div className="grid grid-cols-1 gap-4">
              {plantingLocations.map(location => (
                <div
                  key={location.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.location === location.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, location: location.id }))}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.description}</p>
                    </div>
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.location}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Finalize Your Planting</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Message (Optional)
                </label>
                <textarea
                  name="personalMessage"
                  value={formData.personalMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Leave a message that will be stored with your tree..."
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tree Type:</span>
                    <span className="font-medium">{selectedTree?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{selectedLocation?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{formData.quantity}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold"
              >
                Complete Planting
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Planting Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for contributing to our reforestation efforts. Your trees will be planted in the coming weeks.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span>You'll receive a confirmation email with your order details</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Your NFT certificate will be minted within 24 hours</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Planting updates will be shared via email</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/profile'}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold"
            >
              View in Profile
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plant a Tree</h1>
          <p className="text-xl text-gray-600">
            Create a lasting legacy by sponsoring the planting of new trees in the Mediterranean region.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
} 