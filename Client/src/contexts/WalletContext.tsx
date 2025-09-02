import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import walletService from '../services/walletService';

interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshConnection: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const refreshConnection = async () => {
    try {
      const isConnected = await walletService.ensureConnected();
      setIsConnected(isConnected);
      
      if (isConnected) {
        const walletInfo = await walletService.getWalletInfo();
        if (walletInfo) {
          setAddress(walletInfo.address);
          setChainId(walletInfo.chainId || null);
        }
      } else {
        setAddress(null);
        setChainId(null);
      }
    } catch (error) {
      console.error('Error refreshing wallet connection:', error);
      setIsConnected(false);
      setAddress(null);
      setChainId(null);
    }
  };

  const connect = async () => {
    setIsConnecting(true);
    try {
      const walletInfo = await walletService.connectWallet();
      setIsConnected(true);
      setAddress(walletInfo.address);
      setChainId(walletInfo.chainId || null);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    walletService.disconnectWallet();
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
  };

  useEffect(() => {
    // Initial connection check
    refreshConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setIsConnected(false);
        setAddress(null);
        setChainId(null);
      } else {
        refreshConnection();
      }
    };

    // Listen for chain changes
    const handleChainChanged = () => {
      refreshConnection();
    };

    walletService.onAccountsChanged(handleAccountsChanged);
    walletService.onChainChanged(handleChainChanged);

    return () => {
      walletService.removeListeners();
    };
  }, []);

  const value: WalletContextType = {
    isConnected,
    isConnecting,
    address,
    chainId,
    connect,
    disconnect,
    refreshConnection,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
