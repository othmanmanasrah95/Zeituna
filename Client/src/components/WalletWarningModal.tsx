import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface WalletWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  onConnect: () => void;
}

export default function WalletWarningModal({
  isOpen,
  onClose,
  onSkip,
  onConnect
}: WalletWarningModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Connect Your Wallet
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Connecting your MetaMask wallet allows you to:
            </p>
            
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-semibold">•</span>
                <span>Receive TUT tokens directly to your wallet</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-semibold">•</span>
                <span>Redeem tokens for discounts on purchases</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-semibold">•</span>
                <span>Own your tree adoption NFTs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-semibold">•</span>
                <span>Participate in the Zeituna ecosystem</span>
              </li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ Without connecting your wallet, you'll miss out on:
              </p>
              <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                <li>• TUT token rewards</li>
                <li>• Discount redemption</li>
                <li>• NFT ownership</li>
                <li>• Full platform benefits</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-3 mt-6">
            <button
              onClick={onConnect}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Connect MetaMask Wallet
            </button>
            
            <button
              onClick={onSkip}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Skip for Now (Not Recommended)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 