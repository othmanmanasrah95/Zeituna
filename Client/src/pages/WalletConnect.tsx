import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, PlugZap, Wallet } from 'lucide-react';
import walletService from '../services/walletService';
import authService from '../services/authService';

export default function WalletConnect() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError('');
    setSuccess('');
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    setError('');
    setSuccess('');
    try {
      const info = await walletService.connectWallet();
      await authService.connectWallet(info.address);
      setSuccess('Wallet connected successfully');
      setTimeout(() => navigate('/profile'), 900);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md w-full p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <PlugZap className="w-7 h-7 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Link your wallet</h1>
        <p className="text-gray-600 mb-6">Connect MetaMask to receive TUT rewards and manage your NFTs.</p>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-60"
        >
          <Wallet className="w-5 h-5" /> {connecting ? 'Connecting…' : 'Connect MetaMask'}
        </button>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        {success && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-700">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </div>
        )}

        <button onClick={() => navigate('/profile')} className="mt-6 text-sm text-gray-500 hover:text-gray-700">Back to Profile</button>
      </div>
    </div>
  );
}


