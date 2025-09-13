import { ethers } from 'ethers';
import walletService from './walletService';
import api from '../config/api';

// TUTToken Contract ABI (extracted from compiled contract)
const TUT_TOKEN_ABI = [
  // ERC20 Standard functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // TUTToken specific functions
  "function reward(address recipient, uint256 amount, uint256 reason)",
  "function redeem(uint256 amount, uint256 reason)",
  "function addAuthorizedContract(address contractAddress)",
  "function removeAuthorizedContract(address contractAddress)",
  "function batchReward(tuple(address recipient, uint256 amount, uint256 reason)[] rewards)",
  "function batchAddAuthorizedContracts(address[] contractAddresses)",
  
  // View functions
  "function MAX_SUPPLY() view returns (uint256)",
  "function MIN_REDEEM_AMOUNT() view returns (uint256)",
  "function authorizedContracts(address) view returns (bool)",
  "function owner() view returns (address)",
  
  // Events
  "event Rewarded(address indexed to, uint256 amount, uint256 reason)",
  "event Redeemed(address indexed from, uint256 amount, uint256 reason)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Contract configuration
const CONTRACT_CONFIG = {
  // Update these addresses after deployment
  sepolia: {
    address: '0xeaCb0FcF7652b7a62a1d3CD052C2545710fd2d28',   // Replace with deployed address
    chainId: 11155111
  },
  mainnet: {
    address: '0x0000000000000000000000000000000000000000', // Replace with deployed address
    chainId: 1
  },
  localhost: {
    address: '0x0000000000000000000000000000000000000000', // Replace with deployed address
    chainId: 31337
  }
};

// Reason codes
export const REASON_CODES = {
  INITIAL_REWARD: 1,
  TREE_ADOPTION: 2,
  PLANT_TREE: 3,
  REFERRAL: 4,
  ACHIEVEMENT: 5,
  REDEMPTION: 10
} as const;

export interface RewardData {
  recipient: string;
  amount: string;
  reason: number;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  maxSupply: string;
  minRedeemAmount: string;
}

export interface TokenBalance {
  balance: string;
  formattedBalance: string;
  symbol: string;
}

class TUTTokenService {
  private contract: ethers.Contract | null = null;
  private currentNetwork: string | null = null;

  // Initialize contract connection
  async initialize(): Promise<void> {
    // Ensure wallet is connected first
    const isConnected = await walletService.ensureConnected();
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    const provider = walletService.getProvider();
    const signer = walletService.getSigner();
    
    if (!provider || !signer) {
      throw new Error('Wallet not connected');
    }

    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    // Find the correct network configuration
    const networkConfig = Object.entries(CONTRACT_CONFIG).find(
      ([, config]) => config.chainId === chainId
    );

    if (!networkConfig) {
      throw new Error(`Unsupported network with chainId: ${chainId}`);
    }

    const [networkName, config] = networkConfig;
    this.currentNetwork = networkName;

    if (config.address === '0x0000000000000000000000000000000000000000') {
      throw new Error(`TUTToken contract not deployed on ${networkName} network`);
    }

    this.contract = new ethers.Contract(config.address, TUT_TOKEN_ABI, signer);
  }

  // Get contract instance
  getContract(): ethers.Contract {
    if (!this.contract) {
      throw new Error('Contract not initialized. Call initialize() first.');
    }
    return this.contract;
  }

  // Get token information
  async getTokenInfo(): Promise<TokenInfo> {
    const contract = this.getContract();
    
    const [name, symbol, decimals, totalSupply, maxSupply, minRedeemAmount] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
      contract.MAX_SUPPLY(),
      contract.MIN_REDEEM_AMOUNT()
    ]);

    return {
      name,
      symbol,
      decimals,
      totalSupply: ethers.formatEther(totalSupply),
      maxSupply: ethers.formatEther(maxSupply),
      minRedeemAmount: ethers.formatEther(minRedeemAmount)
    };
  }

  // Get user's token balance
  async getBalance(address?: string): Promise<TokenBalance> {
    const contract = this.getContract();
    const signer = walletService.getSigner();
    
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    const userAddress = address || await signer.getAddress();
    const balance = await contract.balanceOf(userAddress);
    const tokenInfo = await this.getTokenInfo();
    
    return {
      balance: balance.toString(),
      formattedBalance: ethers.formatEther(balance),
      symbol: tokenInfo.symbol
    };
  }

  // Reward tokens to a user (owner only)
  async reward(recipient: string, amount: string, reason: number): Promise<ethers.TransactionResponse> {
    const contract = this.getContract();
    const amountWei = ethers.parseEther(amount);
    
    return await contract.reward(recipient, amountWei, reason);
  }

  // Batch reward multiple users (owner only)
  async batchReward(rewards: RewardData[]): Promise<ethers.TransactionResponse> {
    const contract = this.getContract();
    
    const formattedRewards = rewards.map(reward => ({
      recipient: reward.recipient,
      amount: ethers.parseEther(reward.amount),
      reason: reward.reason
    }));
    
    return await contract.batchReward(formattedRewards);
  }

  // Redeem tokens (user function) - now generates discount code
  async redeem(amount: string, reason: number): Promise<{ transaction: ethers.TransactionResponse; discountCode?: { code: string; percentage: number; tutAmount: number; expiresAt: string; description: string } }> {
    const contract = this.getContract();
    const amountWei = ethers.parseEther(amount);
    
    // Execute the redeem transaction
    const transaction = await contract.redeem(amountWei, reason);
    
    // Wait for transaction confirmation
    await transaction.wait();
    
    // Generate discount code if amount is >= 100 TUT
    const tutAmount = parseFloat(amount);
    if (tutAmount >= 100) {
      try {
        const discountResponse = await this.generateDiscountCode(tutAmount);
        return { transaction, discountCode: discountResponse };
      } catch (error) {
        console.error('Error generating discount code:', error);
        // Return transaction even if discount generation fails
        return { transaction };
      }
    }
    
    return { transaction };
  }

  // Generate discount code for TUT redemption
  async generateDiscountCode(tutAmount: number): Promise<{ code: string; percentage: number; tutAmount: number; expiresAt: string; description: string }> {
    const signer = walletService.getSigner();
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    // Get user ID from backend
    const userId = await this.getUserIdFromAddress();
    
    const requestBody = {
      tutAmount,
      userId
    };
    
    try {
      const response = await api.post('/discounts/generate', requestBody);
      return response.data.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const responseData = (error as { response?: { data?: { message?: string } } })?.response?.data;
      throw new Error(`Failed to generate discount code: ${responseData?.message || errorMessage}`);
    }
  }

  // Helper method to get user ID from wallet address
  private async getUserIdFromAddress(): Promise<string> {
    try {
      const response = await api.get('/auth/profile');
      return response.data.data.user._id;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const responseData = (error as { response?: { data?: { message?: string } } })?.response?.data;
      throw new Error('Failed to get user profile: ' + (responseData?.message || errorMessage));
    }
  }

  // Add authorized contract (owner only)
  async addAuthorizedContract(contractAddress: string): Promise<ethers.TransactionResponse> {
    const contract = this.getContract();
    return await contract.addAuthorizedContract(contractAddress);
  }

  // Batch add authorized contracts (owner only)
  async batchAddAuthorizedContracts(contractAddresses: string[]): Promise<ethers.TransactionResponse> {
    const contract = this.getContract();
    return await contract.batchAddAuthorizedContracts(contractAddresses);
  }

  // Check if address is authorized
  async isAuthorized(address: string): Promise<boolean> {
    const contract = this.getContract();
    return await contract.authorizedContracts(address);
  }

  // Get contract owner
  async getOwner(): Promise<string> {
    const contract = this.getContract();
    return await contract.owner();
  }

  // Listen to contract events
  onRewarded(callback: (to: string, amount: string, reason: number) => void): void {
    const contract = this.getContract();
    contract.on('Rewarded', (to, amount, reason) => {
      callback(to, ethers.formatEther(amount), Number(reason));
    });
  }

  onRedeemed(callback: (from: string, amount: string, reason: number) => void): void {
    const contract = this.getContract();
    contract.on('Redeemed', (from, amount, reason) => {
      callback(from, ethers.formatEther(amount), Number(reason));
    });
  }

  // Remove event listeners
  removeAllListeners(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  // Get current network
  getCurrentNetwork(): string | null {
    return this.currentNetwork;
  }

  // Check if contract is initialized
  isInitialized(): boolean {
    return this.contract !== null;
  }

  // Sync blockchain balance with backend database
  async syncBalanceWithBackend(): Promise<{ success: boolean; message: string; syncedAmount?: number }> {
    try {
      const balanceData = await this.getBalance();
      const blockchainBalance = parseFloat(balanceData.formattedBalance);
      
      const response = await api.post('/users/sync-tut-balance', {
        blockchainBalance
      });
      
      return {
        success: true,
        message: response.data.data.message,
        syncedAmount: response.data.data.syncedAmount
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const responseData = (error as { response?: { data?: { message?: string } } })?.response?.data;
      throw new Error(`Failed to sync balance: ${responseData?.message || errorMessage}`);
    }
  }
}

// Create a singleton instance
const tutTokenService = new TUTTokenService();

export default tutTokenService;
