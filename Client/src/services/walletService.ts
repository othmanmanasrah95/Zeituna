import { ethers } from 'ethers';

export interface WalletInfo {
  address: string;
  isConnected: boolean;
  chainId?: number;
}

class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  // Check if MetaMask is installed
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  // Check if MetaMask is connected
  async isMetaMaskConnected(): Promise<boolean> {
    if (!this.isMetaMaskInstalled()) return false;
    
    try {
      const accounts = await window.ethereum!.request({ method: 'eth_accounts' });
      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking MetaMask connection:', error);
      return false;
    }
  }

  // Connect to MetaMask
  async connectWallet(): Promise<WalletInfo> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your MetaMask wallet.');
      }

      const address = accounts[0];
      
      // Create provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum!);
      this.signer = await this.provider.getSigner();
      
      // Get network info
      const network = await this.provider.getNetwork();
      
      return {
        address,
        isConnected: true,
        chainId: Number(network.chainId)
      };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  }

  // Get current wallet info
  async getWalletInfo(): Promise<WalletInfo | null> {
    if (!this.isMetaMaskInstalled()) return null;

    try {
      const accounts = await window.ethereum!.request({ method: 'eth_accounts' });
      
      if (accounts.length === 0) {
        return { address: '', isConnected: false };
      }

      const address = accounts[0];
      
      if (this.provider) {
        const network = await this.provider.getNetwork();
        return {
          address,
          isConnected: true,
          chainId: Number(network.chainId)
        };
      }

      return { address, isConnected: true };
    } catch (error) {
      console.error('Error getting wallet info:', error);
      return null;
    }
  }

  // Disconnect wallet
  disconnectWallet(): void {
    this.provider = null;
    this.signer = null;
  }

  // Get provider
  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  // Get signer
  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer;
  }

  // Listen for account changes
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (!this.isMetaMaskInstalled()) return;

    window.ethereum!.on('accountsChanged', callback);
  }

  // Listen for chain changes
  onChainChanged(callback: (chainId: string) => void): void {
    if (!this.isMetaMaskInstalled()) return;

    window.ethereum!.on('chainChanged', callback);
  }

  // Remove listeners
  removeListeners(): void {
    if (!this.isMetaMaskInstalled()) return;

    window.ethereum!.removeAllListeners('accountsChanged');
    window.ethereum!.removeAllListeners('chainChanged');
  }
}

// Create a singleton instance
const walletService = new WalletService();

export default walletService; 