import React, { useState, useEffect } from 'react';
import { Send, Gift, Coins, AlertCircle, CheckCircle2, Copy, Tag } from 'lucide-react';
import tutTokenService, { REASON_CODES, RewardData } from '../services/tutTokenService';
import walletService from '../services/walletService';
import discountService, { DiscountCode } from '../services/discountService';

interface TokenOperationsProps {
  className?: string;
}

export default function TokenOperations({ className = '' }: TokenOperationsProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [redeemAmount, setRedeemAmount] = useState('');
  const [generatedDiscount, setGeneratedDiscount] = useState<DiscountCode | null>(null);
  const [userDiscounts, setUserDiscounts] = useState<DiscountCode[]>([]);
  const [rewardData, setRewardData] = useState({
    recipient: '',
    amount: '',
    reason: REASON_CODES.TREE_ADOPTION
  });
  const [batchRewards, setBatchRewards] = useState<RewardData[]>([]);

  useEffect(() => {
    checkOwnerStatus();
    loadUserDiscounts();
  }, []);

  const checkOwnerStatus = async () => {
    try {
      if (!tutTokenService.isInitialized()) {
        await tutTokenService.initialize();
      }
      
      const signer = walletService.getSigner();
      if (!signer) return;

      const userAddress = await signer.getAddress();
      const ownerAddress = await tutTokenService.getOwner();
      
      setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
    } catch (err) {
      console.error('Error checking owner status:', err);
    }
  };

  const loadUserDiscounts = async () => {
    try {
      const result = await discountService.getUserDiscounts('active');
      setUserDiscounts(result.discounts);
    } catch (err) {
      console.error('Error loading user discounts:', err);
    }
  };

  const handleRedeem = async () => {
    if (!redeemAmount) {
      setError('Please enter an amount to redeem');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setGeneratedDiscount(null);

    try {
      const result = await tutTokenService.redeem(redeemAmount, REASON_CODES.REDEMPTION);
      
      let successMessage = `Successfully redeemed ${redeemAmount} TUT tokens`;
      
      if (result.discountCode) {
        setGeneratedDiscount(result.discountCode);
        const percentage = result.discountCode.percentage;
        successMessage += ` and received a ${percentage}% discount code!`;
      }
      
      setSuccess(successMessage);
      setRedeemAmount('');
      
      // Reload user discounts
      await loadUserDiscounts();
    } catch (err: any) {
      setError(err.message || 'Failed to redeem tokens');
    } finally {
      setLoading(false);
    }
  };

  const copyDiscountCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setSuccess('Discount code copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleReward = async () => {
    if (!rewardData.recipient || !rewardData.amount) {
      setError('Please fill in all reward fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const tx = await tutTokenService.reward(
        rewardData.recipient,
        rewardData.amount,
        rewardData.reason
      );
      await tx.wait();
      
      setSuccess(`Successfully rewarded ${rewardData.amount} TUT to ${rewardData.recipient}`);
      setRewardData({ recipient: '', amount: '', reason: REASON_CODES.TREE_ADOPTION });
    } catch (err: any) {
      setError(err.message || 'Failed to reward tokens');
    } finally {
      setLoading(false);
    }
  };

  const addBatchReward = () => {
    if (!rewardData.recipient || !rewardData.amount) {
      setError('Please fill in recipient and amount');
      return;
    }

    setBatchRewards([...batchRewards, { ...rewardData }]);
    setRewardData({ recipient: '', amount: '', reason: REASON_CODES.TREE_ADOPTION });
  };

  const removeBatchReward = (index: number) => {
    setBatchRewards(batchRewards.filter((_, i) => i !== index));
  };

  const handleBatchReward = async () => {
    if (batchRewards.length === 0) {
      setError('Please add at least one reward to the batch');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const tx = await tutTokenService.batchReward(batchRewards);
      await tx.wait();
      
      setSuccess(`Successfully rewarded ${batchRewards.length} users in batch`);
      setBatchRewards([]);
    } catch (err: any) {
      setError(err.message || 'Failed to batch reward tokens');
    } finally {
      setLoading(false);
    }
  };

  const getReasonText = (reason: number): string => {
    const reasonMap: Record<number, string> = {
      [REASON_CODES.INITIAL_REWARD]: 'Initial Reward',
      [REASON_CODES.TREE_ADOPTION]: 'Tree Adoption',
      [REASON_CODES.PLANT_TREE]: 'Plant Tree',
      [REASON_CODES.REFERRAL]: 'Referral',
      [REASON_CODES.ACHIEVEMENT]: 'Achievement',
      [REASON_CODES.REDEMPTION]: 'Redemption'
    };
    return reasonMap[reason] || 'Unknown';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Success</span>
          </div>
          <p className="text-green-500 text-sm mt-1">{success}</p>
        </div>
      )}

      {/* Generated Discount Code */}
      {generatedDiscount && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">🎉 Discount Code Generated!</h3>
              <p className="text-sm text-gray-600">Use this code at checkout for {generatedDiscount.percentage}% off</p>
            </div>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Your Discount Code:</p>
                <p className="text-2xl font-bold text-purple-600 font-mono">{generatedDiscount.code}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Expires: {new Date(generatedDiscount.expiresAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => copyDiscountCode(generatedDiscount.code)}
                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                title="Copy code"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Tokens (User Function) */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Redeem Tokens</h3>
            <p className="text-sm text-gray-600">Convert your TUT tokens (minimum 20 TUT)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Redeem
            </label>
            <input
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              placeholder="20.0"
              min="20"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleRedeem}
            disabled={loading || !redeemAmount}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Redeem Tokens'}
          </button>
        </div>
      </div>

      {/* Owner Functions */}
      {isOwner && (
        <>
          {/* Single Reward */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reward Tokens</h3>
                <p className="text-sm text-gray-600">Send TUT tokens to users (Owner only)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={rewardData.recipient}
                  onChange={(e) => setRewardData({ ...rewardData, recipient: e.target.value })}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={rewardData.amount}
                  onChange={(e) => setRewardData({ ...rewardData, amount: e.target.value })}
                  placeholder="100.0"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <select
                  value={rewardData.reason}
                  onChange={(e) => setRewardData({ ...rewardData, reason: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value={REASON_CODES.INITIAL_REWARD}>Initial Reward</option>
                  <option value={REASON_CODES.TREE_ADOPTION}>Tree Adoption</option>
                  <option value={REASON_CODES.PLANT_TREE}>Plant Tree</option>
                  <option value={REASON_CODES.REFERRAL}>Referral</option>
                  <option value={REASON_CODES.ACHIEVEMENT}>Achievement</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReward}
                  disabled={loading || !rewardData.recipient || !rewardData.amount}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Reward Tokens'}
                </button>
                <button
                  onClick={addBatchReward}
                  disabled={!rewardData.recipient || !rewardData.amount}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Batch
                </button>
              </div>
            </div>
          </div>

          {/* Batch Rewards */}
          {batchRewards.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Batch Rewards</h3>
                    <p className="text-sm text-gray-600">{batchRewards.length} rewards pending</p>
                  </div>
                </div>
                <button
                  onClick={handleBatchReward}
                  disabled={loading}
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Execute Batch'}
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {batchRewards.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{reward.recipient.slice(0, 10)}...</p>
                      <p className="text-xs text-gray-600">
                        {reward.amount} TUT - {getReasonText(reward.reason)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeBatchReward(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!isOwner && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Owner Functions</span>
          </div>
          <p className="text-yellow-500 text-sm mt-1">
            Only the contract owner can reward tokens to users.
          </p>
        </div>
      )}

      {/* Quick Discount Code Info */}
      {userDiscounts.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Tag className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                You have {userDiscounts.length} active discount code(s)
              </p>
              <p className="text-xs text-gray-600">
                Check your profile page to view and manage all your discount codes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

