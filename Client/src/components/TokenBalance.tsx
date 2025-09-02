import { useState, useEffect } from 'react';
import { Coins, RefreshCw } from 'lucide-react';
import tutTokenService, { TokenBalance as TokenBalanceData } from '../services/tutTokenService';
import { useWallet } from '../contexts/WalletContext';

interface TokenBalanceProps {
  address?: string;
  showRefresh?: boolean;
  className?: string;
}

export default function TokenBalance({ 
  address, 
  showRefresh = true, 
  className = '' 
}: TokenBalanceProps) {
  const { isConnected } = useWallet();
  const [balance, setBalance] = useState<TokenBalanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchBalance = async (retryCount = 0) => {
    if (!isConnected) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Initialize contract if not already done
      if (!tutTokenService.isInitialized()) {
        await tutTokenService.initialize();
      }

      const balanceData = await tutTokenService.getBalance(address);
      setBalance(balanceData);
    } catch (err: any) {
      console.error('Error fetching token balance:', err);
      
      // Retry once if it's a connection issue
      if (retryCount === 0 && err.message?.includes('Wallet not connected')) {
        console.log('Retrying token balance fetch...');
        setTimeout(() => fetchBalance(1), 1000);
        return;
      }
      
      setError(err.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchBalance();
    } else {
      setError('Wallet not connected');
      setBalance(null);
    }
  }, [address, isConnected]);

  const handleRefresh = () => {
    fetchBalance();
  };

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 text-red-600">
          <Coins className="w-5 h-5" />
          <span className="font-medium">Token Balance Error</span>
        </div>
        <p className="text-red-500 text-sm mt-1">{error}</p>
        {showRefresh && (
          <button
            onClick={handleRefresh}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Coins className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">TUT Balance</h3>
            {loading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-gray-500">Loading...</span>
              </div>
            ) : balance ? (
              <p className="text-2xl font-bold text-gray-900">
                {parseFloat(balance.formattedBalance).toFixed(2)} {balance.symbol}
              </p>
            ) : (
              <p className="text-gray-500">No balance data</p>
            )}
          </div>
        </div>
        
        {showRefresh && (
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            title="Refresh balance"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      {balance && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Network:</span>
            <span className="font-medium">
              {tutTokenService.getCurrentNetwork() || 'Unknown'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
            <span>Raw Balance:</span>
            <span className="font-mono text-xs">
              {balance.balance} wei
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
