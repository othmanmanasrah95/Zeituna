import React, { useState, useEffect } from 'react';
import { Wifi, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import walletService from '../services/walletService';
import tutTokenService from '../services/tutTokenService';

interface NetworkInfo {
  name: string;
  chainId: number;
  rpcUrl?: string;
  blockExplorer?: string;
  isSupported: boolean;
}

const SUPPORTED_NETWORKS: Record<number, NetworkInfo> = {
  1: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    blockExplorer: 'https://etherscan.io',
    isSupported: false // Set to true when deployed to mainnet
  },
  11155111: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    blockExplorer: 'https://sepolia.etherscan.io',
    isSupported: true
  },
  31337: {
    name: 'Localhost',
    chainId: 31337,
    isSupported: true
  }
};

export default function NetworkConfig() {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractSupported, setContractSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkNetworkStatus();
    
    // Listen for network changes
    walletService.onChainChanged(handleNetworkChange);
    
    return () => {
      walletService.removeListeners();
    };
  }, []);

  const checkNetworkStatus = async () => {
    setLoading(true);
    
    try {
      const walletInfo = await walletService.getWalletInfo();
      setIsConnected(!!walletInfo?.isConnected);
      
      if (walletInfo?.chainId) {
        const network = SUPPORTED_NETWORKS[walletInfo.chainId];
        setCurrentNetwork(network || null);
        
        // Check if contract is supported on this network
        if (network?.isSupported) {
          try {
            await tutTokenService.initialize();
            setContractSupported(true);
          } catch (error) {
            setContractSupported(false);
          }
        } else {
          setContractSupported(false);
        }
      }
    } catch (error) {
      console.error('Error checking network status:', error);
      setIsConnected(false);
      setCurrentNetwork(null);
      setContractSupported(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkChange = (chainId: string) => {
    // Network changed, refresh status
    setTimeout(checkNetworkStatus, 1000);
  };

  const switchToSepolia = async () => {
    if (!walletService.isMetaMaskInstalled()) {
      alert('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hex
      });
    } catch (error: any) {
      // If the network doesn't exist, add it
      if (error.code === 4902) {
        try {
          await window.ethereum!.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Sepolia Testnet',
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
                nativeCurrency: {
                  name: 'SepoliaETH',
                  symbol: 'SepoliaETH',
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
        }
      } else {
        console.error('Error switching to Sepolia:', error);
      }
    }
  };

  const getNetworkStatusColor = () => {
    if (!isConnected) return 'text-gray-500';
    if (!currentNetwork) return 'text-red-500';
    if (!currentNetwork.isSupported) return 'text-yellow-500';
    if (!contractSupported) return 'text-orange-500';
    return 'text-green-500';
  };

  const getNetworkStatusText = () => {
    if (!isConnected) return 'Wallet not connected';
    if (!currentNetwork) return 'Unsupported network';
    if (!currentNetwork.isSupported) return 'Network not supported';
    if (!contractSupported) return 'Contract not deployed';
    return 'Network ready';
  };

  const getNetworkStatusIcon = () => {
    if (!isConnected || !currentNetwork || !currentNetwork.isSupported || !contractSupported) {
      return <AlertTriangle className="w-5 h-5" />;
    }
    return <CheckCircle2 className="w-5 h-5" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Wifi className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Network Status</h3>
          <p className="text-sm text-gray-600">Blockchain connection and contract support</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <span>Checking network...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Network Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getNetworkStatusIcon()}
              <span className="font-medium text-gray-900">Status</span>
            </div>
            <span className={`font-medium ${getNetworkStatusColor()}`}>
              {getNetworkStatusText()}
            </span>
          </div>

          {/* Current Network */}
          {currentNetwork && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">Network</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{currentNetwork.name}</div>
                <div className="text-sm text-gray-500">Chain ID: {currentNetwork.chainId}</div>
              </div>
            </div>
          )}

          {/* Contract Support */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">TUT Contract</span>
            </div>
            <span className={`font-medium ${contractSupported ? 'text-green-600' : 'text-red-500'}`}>
              {contractSupported ? 'Available' : 'Not Available'}
            </span>
          </div>

          {/* Actions */}
          {!isConnected && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm mb-2">
                Connect your wallet to interact with TUT tokens
              </p>
              <button
                onClick={() => window.location.href = '/wallet/connect'}
                className="text-sm text-yellow-700 hover:text-yellow-800 underline"
              >
                Connect Wallet
              </button>
            </div>
          )}

          {isConnected && currentNetwork && !currentNetwork.isSupported && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm mb-2">
                Switch to Sepolia testnet to use TUT tokens
              </p>
              <button
                onClick={switchToSepolia}
                className="text-sm text-orange-700 hover:text-orange-800 underline"
              >
                Switch to Sepolia
              </button>
            </div>
          )}

          {isConnected && currentNetwork?.isSupported && !contractSupported && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                TUT contract is not deployed on this network yet
              </p>
            </div>
          )}

          {/* Block Explorer Link */}
          {currentNetwork?.blockExplorer && (
            <div className="pt-2 border-t border-gray-200">
              <a
                href={currentNetwork.blockExplorer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                View on Block Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
